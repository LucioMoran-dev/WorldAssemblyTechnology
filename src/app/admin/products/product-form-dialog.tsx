"use client";

import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateProductWithImages,
  useUpdateProduct,
  useAddVariant,
  useUpdateVariant,
  useDeleteVariant,
  useUploadProductImage,
  useProductImages,
  useDeleteProductImage,
} from "@/hooks";
import { VARIANT_TYPE_LABELS } from "@/seeds";
import type {
  ICategory,
  ICreateProductDto,
  ICreateVariantDto,
  IProduct,
  IProductImage,
  IProductSpecifications,
  IProductVariant,
  IUpdateProductDto,
} from "@/types";
import { VariantType } from "@/types";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct?: IProduct | null;
  categories: ICategory[];
}

interface ProductFormState {
  name: string;
  description: string;
  brand: string;
  model: string;
  basePrice: string;
  baseStock: string;
  categoryId: string;
  featured: boolean;
  hasVariants: boolean;
  isActive: boolean;
  specificationsRaw: string;
}

interface DraftVariant {
  _key: string;
  type: string;
  name: string;
  description: string;
  priceModifier: string;
  stock: string;
  isAvailable: boolean;
  sortOrder: string;
}

const EMPTY_FORM: ProductFormState = {
  name: "",
  description: "",
  brand: "",
  model: "",
  basePrice: "",
  baseStock: "",
  categoryId: "",
  featured: false,
  hasVariants: false,
  isActive: true,
  specificationsRaw: "",
};

const EMPTY_DRAFT_VARIANT: Omit<DraftVariant, "_key"> = {
  type: "",
  name: "",
  description: "",
  priceModifier: "0",
  stock: "0",
  isAvailable: true,
  sortOrder: "0",
};

// Campos editables de una variante ya existente. El `type` no se toca:
// cambiarlo movería la variante de grupo y rompería las selecciones hechas.
const EMPTY_VARIANT_EDIT = {
  name: "",
  priceModifier: "0",
  stock: "0",
  isAvailable: true,
};

function initializeFromProduct(p: IProduct): ProductFormState {
  return {
    name: p.name,
    description: p.description,
    brand: p.brand,
    model: p.model ?? "",
    basePrice: String(p.basePrice),
    baseStock: String(p.baseStock),
    categoryId: p.category?.id ?? "",
    featured: p.featured,
    hasVariants: p.hasVariants,
    isActive: p.isActive,
    specificationsRaw: p.specifications
      ? JSON.stringify(p.specifications, null, 2)
      : "",
  };
}

export function ProductFormDialog({
  open,
  onOpenChange,
  editingProduct,
  categories,
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState<ProductFormState>(EMPTY_FORM);
  const [pendingVariants, setPendingVariants] = useState<DraftVariant[]>([]);
  const [existingVariants, setExistingVariants] = useState<IProductVariant[]>(
    []
  );
  const [variantDraft, setVariantDraft] =
    useState<Omit<DraftVariant, "_key">>(EMPTY_DRAFT_VARIANT);
  const [activeTab, setActiveTab] = useState("basic");
  // Variante existente que se está editando inline (modo edición)
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [variantEdit, setVariantEdit] = useState(EMPTY_VARIANT_EDIT);
  // Imagen que se va a eliminar (confirmación previa: el borrado también
  // saca el archivo de Cloudinary, no tiene vuelta atrás)
  const [deleteImageTarget, setDeleteImageTarget] =
    useState<IProductImage | null>(null);

  // Imágenes ya persistidas (modo edición) y su estado de subida
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [uploadingFileName, setUploadingFileName] = useState<string | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  // Imágenes elegidas en modo creación: se suben junto con el producto (un solo request)
  const [pendingImages, setPendingImages] = useState<
    { file: File; preview: string }[]
  >([]);

  const createProductWithImages = useCreateProductWithImages();
  const updateProduct = useUpdateProduct();
  const addVariant = useAddVariant();
  const updateVariant = useUpdateVariant();
  const deleteVariant = useDeleteVariant();
  const uploadImage = useUploadProductImage();
  // Imágenes con su ID (necesario para poder borrarlas) — solo en edición
  const { data: productImages } = useProductImages(editingProduct?.id ?? "");
  const deleteProductImage = useDeleteProductImage();

  // En edición trabajamos sobre el producto recibido; en creación no hay producto aún
  const currentProduct = editingProduct ?? null;
  const isEditMode = Boolean(editingProduct);

  useEffect(() => {
    if (!open) {
      setFormData(EMPTY_FORM);
      setPendingVariants([]);
      setExistingVariants([]);
      setVariantDraft(EMPTY_DRAFT_VARIANT);
      setActiveTab("basic");
      setCurrentImages([]);
      setUploadingFileName(null);
      setUploadProgress(null);
      setPendingImages((prev) => {
        prev.forEach((img) => URL.revokeObjectURL(img.preview));
        return [];
      });
      return;
    }
    if (editingProduct) {
      setFormData(initializeFromProduct(editingProduct));
      setExistingVariants(editingProduct.variants ?? []);
      setCurrentImages(editingProduct.imgUrls ?? []);
    } else {
      setFormData(EMPTY_FORM);
      setPendingVariants([]);
      setCurrentImages([]);
    }
  }, [open, editingProduct]);

  const set = <K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K]
  ) => setFormData((prev) => ({ ...prev, [key]: value }));

  const addPendingVariant = () => {
    if (!variantDraft.type || !variantDraft.name.trim()) return;
    setPendingVariants((prev) => [
      ...prev,
      { ...variantDraft, _key: crypto.randomUUID() },
    ]);
    setVariantDraft(EMPTY_DRAFT_VARIANT);
  };

  const removePendingVariant = (key: string) =>
    setPendingVariants((prev) => prev.filter((v) => v._key !== key));

  const handleAddExistingVariant = async () => {
    if (!currentProduct || !variantDraft.type || !variantDraft.name.trim())
      return;
    const data: ICreateVariantDto = {
      type: variantDraft.type,
      name: variantDraft.name,
      description: variantDraft.description || undefined,
      priceModifier: Number(variantDraft.priceModifier),
      stock: Number(variantDraft.stock),
      isAvailable: variantDraft.isAvailable,
      sortOrder: Number(variantDraft.sortOrder) || 0,
    };
    const newVariant = await addVariant.mutateAsync({
      productId: currentProduct.id,
      data,
    });
    setExistingVariants((prev) => [...prev, newVariant]);
    setVariantDraft(EMPTY_DRAFT_VARIANT);
  };

  const handleDeleteExistingVariant = async (variantId: string) => {
    if (!currentProduct) return;
    await deleteVariant.mutateAsync({
      variantId,
      productId: currentProduct.id,
    });
    setExistingVariants((prev) => prev.filter((v) => v.id !== variantId));
  };

  // Edición inline de una variante ya persistida. Preferimos editar antes
  // que borrar+recrear: recrear genera un variantId nuevo y las órdenes
  // viejas quedan apuntando a una variante que ya no existe.
  const startEditingVariant = (variant: IProductVariant) => {
    setEditingVariantId(variant.id);
    setVariantEdit({
      name: variant.name,
      priceModifier: String(variant.priceModifier),
      stock: String(variant.stock),
      isAvailable: variant.isAvailable,
    });
  };

  const cancelEditingVariant = () => {
    setEditingVariantId(null);
    setVariantEdit(EMPTY_VARIANT_EDIT);
  };

  const handleSaveVariantEdit = async (variantId: string) => {
    if (!currentProduct) return;
    const updated = await updateVariant.mutateAsync({
      variantId,
      productId: currentProduct.id,
      data: {
        name: variantEdit.name.trim(),
        priceModifier: Number(variantEdit.priceModifier) || 0,
        stock: Number(variantEdit.stock) || 0,
        isAvailable: variantEdit.isAvailable,
      },
    });
    // Reflejamos el cambio en la lista local sin esperar al refetch
    setExistingVariants((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, ...updated } : v))
    );
    cancelEditingVariant();
  };

  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFilesSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !currentProduct) return;

    for (const file of Array.from(files)) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error(
          `"${file.name}": formato no soportado. Usá JPG, PNG o WEBP`
        );
        continue;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`"${file.name}": la imagen supera el límite de 5MB`);
        continue;
      }

      setUploadingFileName(file.name);
      setUploadProgress(0);
      try {
        const result = await uploadImage.mutateAsync({
          productId: currentProduct.id,
          file,
          onProgress: setUploadProgress,
        });
        setCurrentImages((prev) => [...prev, result.url]);
      } catch {
        // el hook ya muestra el toast de error; seguimos con el resto de archivos
      }
    }
    setUploadingFileName(null);
    setUploadProgress(null);
    e.target.value = "";
  };

  const MAX_IMAGES = 8; // límite del back para /products/with-images

  // Modo creación: acumula archivos localmente para subirlos junto con el producto
  const handleStageImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setPendingImages((prev) => {
      const next = [...prev];
      for (const file of Array.from(files)) {
        if (next.length >= MAX_IMAGES) {
          toast.error(`Máximo ${MAX_IMAGES} imágenes por producto`);
          break;
        }
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          toast.error(
            `"${file.name}": formato no soportado. Usá JPG, PNG o WEBP`
          );
          continue;
        }
        if (file.size > MAX_IMAGE_SIZE) {
          toast.error(`"${file.name}": la imagen supera el límite de 5MB`);
          continue;
        }
        next.push({ file, preview: URL.createObjectURL(file) });
      }
      return next;
    });
    e.target.value = "";
  };

  const removePendingImage = (index: number) => {
    setPendingImages((prev) => {
      const next = [...prev];
      const [removed] = next.splice(index, 1);
      if (removed) URL.revokeObjectURL(removed.preview);
      return next;
    });
  };

  const getValidationError = (): string | null => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.brand.trim() ||
      !formData.categoryId ||
      !formData.basePrice ||
      Number(formData.basePrice) <= 0
    ) {
      return "Completá los campos obligatorios: nombre, descripción, marca, categoría y precio";
    }
    return null;
  };

  const parseSpecifications = ():
    { ok: true; value?: IProductSpecifications } | { ok: false } => {
    if (!formData.specificationsRaw.trim())
      return { ok: true, value: undefined };
    try {
      return { ok: true, value: JSON.parse(formData.specificationsRaw) };
    } catch {
      return { ok: false };
    }
  };

  // El select guarda el id de la categoría; la API espera el category_name (string).
  const resolveCategoryName = (): string => {
    const selectedCat = categories.find((c) => c.id === formData.categoryId);
    return selectedCat?.category_name ?? selectedCat?.name ?? "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = getValidationError();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    const specs = parseSpecifications();
    if (!specs.ok) {
      toast.error("El JSON de especificaciones no es válido");
      return;
    }

    try {
      if (currentProduct) {
        const payload: IUpdateProductDto = {
          name: formData.name,
          description: formData.description,
          brand: formData.brand,
          model: formData.model || undefined,
          basePrice: Number(formData.basePrice),
          baseStock: formData.hasVariants
            ? undefined
            : Number(formData.baseStock),
          categoryName: resolveCategoryName(),
          imgUrls: Array.from(new Set(currentImages)),
          featured: formData.featured,
          specifications: specs.value,
          isActive: formData.isActive,
        };
        await updateProduct.mutateAsync({
          id: currentProduct.id,
          data: payload,
        });
      } else {
        const payload: ICreateProductDto = {
          name: formData.name,
          description: formData.description,
          brand: formData.brand,
          model: formData.model || undefined,
          basePrice: Number(formData.basePrice),
          baseStock: formData.hasVariants ? 0 : Number(formData.baseStock),
          categoryName: resolveCategoryName(),
          featured: formData.featured,
          hasVariants: formData.hasVariants,
          specifications: specs.value,
          variants: formData.hasVariants
            ? pendingVariants.map((v) => ({
                type: v.type,
                name: v.name,
                description: v.description || undefined,
                priceModifier: Number(v.priceModifier),
                stock: Number(v.stock),
                isAvailable: v.isAvailable,
                sortOrder: Number(v.sortOrder) || 0,
              }))
            : undefined,
        };
        // Producto + imágenes en un solo request atómico
        await createProductWithImages.mutateAsync({
          data: payload,
          images: pendingImages.map((img) => img.file),
        });
      }

      onOpenChange(false);
    } catch {
      // Los hooks muestran el toast de error; mantenemos el dialog abierto para reintentar.
    }
  };

  const isPending =
    createProductWithImages.isPending ||
    updateProduct.isPending ||
    addVariant.isPending ||
    deleteVariant.isPending ||
    uploadImage.isPending;

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none disabled:opacity-50";
  const labelClass = "mb-1.5 block text-sm font-medium text-muted-foreground";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o && !isPending) onOpenChange(false);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Producto" : "Agregar Producto"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modificá los datos del producto. Las variantes se administran por separado en la pestaña Variantes."
              : "Completá los datos para crear un nuevo producto."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="stock">Precio</TabsTrigger>
              <TabsTrigger value="images">Imágenes</TabsTrigger>
              <TabsTrigger value="variants">Variantes</TabsTrigger>
            </TabsList>

            {/* ── TAB: BÁSICO ── */}
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>Nombre *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputClass}
                    placeholder="Ej: Dell Inspiron 15 3520"
                    minLength={3}
                    maxLength={200}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>Descripción *</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => set("description", e.target.value)}
                    className={inputClass}
                    placeholder="Descripción del producto..."
                    minLength={10}
                    maxLength={500}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Marca *</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => set("brand", e.target.value)}
                    className={inputClass}
                    placeholder="Ej: Dell"
                    minLength={2}
                    maxLength={50}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Modelo</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => set("model", e.target.value)}
                    className={inputClass}
                    placeholder="Ej: Inspiron 15 3520"
                    maxLength={100}
                  />
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>Categoría *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => set("categoryId", e.target.value)}
                    className={inputClass}
                    required
                  >
                    <option value="">Seleccionar categoría...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name || cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => set("featured", checked)}
                  />
                  <span className="text-sm font-medium text-foreground">
                    Destacado
                  </span>
                </label>

                {isEditMode && (
                  <label className="flex cursor-pointer items-center gap-2">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => set("isActive", checked)}
                    />
                    <span className="text-sm font-medium text-foreground">
                      Activo
                    </span>
                  </label>
                )}
              </div>
            </TabsContent>

            {/* ── TAB: PRECIO Y STOCK ── */}
            <TabsContent value="stock" className="space-y-4 pt-4">
              <div>
                <label className={labelClass}>Precio Base (USD) *</label>
                <input
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => set("basePrice", e.target.value)}
                  className={inputClass}
                  placeholder="0.00"
                  min={0.01}
                  step={0.01}
                  required
                />
              </div>

              <div className="space-y-3 rounded-lg border border-border p-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <Switch
                    checked={formData.hasVariants}
                    onCheckedChange={(checked) => set("hasVariants", checked)}
                  />
                  <span className="text-sm font-medium text-foreground">
                    Este producto tiene variantes
                  </span>
                </label>
                <p className="text-xs text-muted-foreground">
                  Activá si el producto tiene opciones de RAM, almacenamiento,
                  color, etc.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Stock Base{" "}
                  {formData.hasVariants && (
                    <span className="text-muted-foreground">
                      (gestionado por variante)
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  value={formData.baseStock}
                  onChange={(e) => set("baseStock", e.target.value)}
                  className={inputClass}
                  placeholder="0"
                  min={0}
                  step={1}
                  disabled={formData.hasVariants}
                  required={!formData.hasVariants}
                />
                {formData.hasVariants && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Con variantes activas, el stock se maneja en la pestaña
                    Variantes.
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Especificaciones (JSON, opcional)
                </label>
                <textarea
                  rows={5}
                  value={formData.specificationsRaw}
                  onChange={(e) => set("specificationsRaw", e.target.value)}
                  className={`${inputClass} font-mono text-xs`}
                  placeholder={
                    '{\n  "pantalla": "15.6 pulgadas",\n  "bateria": "8 horas"\n}'
                  }
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  JSON libre. Dejá vacío si no hay especificaciones.
                </p>
              </div>
            </TabsContent>

            {/* ── TAB: IMÁGENES ── */}
            <TabsContent value="images" className="space-y-4 pt-4">
              {!isEditMode ? (
                <div className="space-y-4">
                  {pendingImages.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {pendingImages.map((img, i) => (
                        <div
                          key={img.preview}
                          className="relative h-20 w-20 overflow-hidden rounded-lg border border-border bg-muted"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.preview}
                            alt={`Imagen ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePendingImage(i)}
                            className="absolute top-0.5 right-0.5 rounded-full bg-black/60 p-0.5 text-white transition-colors hover:bg-black/80"
                            aria-label={`Quitar imagen ${i + 1}`}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>
                      Imágenes{" "}
                      <span className="text-muted-foreground">
                        ({pendingImages.length}/{MAX_IMAGES})
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      onChange={handleStageImages}
                      disabled={pendingImages.length >= MAX_IMAGES}
                      className={`${inputClass} cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium`}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Se suben junto con el producto al crearlo. Máx{" "}
                      {MAX_IMAGES} imágenes, 5MB c/u. La primera se usa como
                      miniatura.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Las imágenes vienen de GET /files/product/:id porque
                      traen el imageId que necesita el borrado; product.imgUrls
                      solo tiene URLs. Si esa consulta todavía no respondió,
                      mostramos las URLs del producto en modo solo lectura. */}
                  {productImages && productImages.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {productImages.map((image, i) => (
                        <div
                          key={image.id}
                          className="group relative h-20 w-20 overflow-hidden rounded-lg border border-border bg-muted"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.url}
                            alt={`Imagen ${i + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setDeleteImageTarget(image)}
                            disabled={deleteProductImage.isPending}
                            className="absolute top-1 right-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
                            title="Eliminar imagen"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : currentImages.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {currentImages.map((url, i) => (
                        <div
                          key={`${url}-${i}`}
                          className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`Imagen ${i + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div>
                    <label className={labelClass}>Subir imágenes</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      onChange={handleFilesSelected}
                      disabled={uploadingFileName !== null}
                      className={`${inputClass} cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium`}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Podés seleccionar varias imágenes a la vez. La primera se
                      usa como miniatura.
                    </p>
                  </div>

                  {uploadingFileName && (
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                      <Upload className="h-4 w-4 animate-pulse" />
                      Subiendo &quot;{uploadingFileName}&quot;
                      {uploadProgress !== null
                        ? ` — ${uploadProgress}%`
                        : "..."}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* ── TAB: VARIANTES ── */}
            <TabsContent value="variants" className="space-y-4 pt-4">
              {!formData.hasVariants ? (
                <div className="rounded-lg border border-dashed border-border p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Activá &quot;Tiene variantes&quot; en la pestaña Precio para
                    habilitar esta sección.
                  </p>
                </div>
              ) : (
                <>
                  {/* Lista de variantes */}
                  {(isEditMode ? existingVariants : pendingVariants).length >
                    0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Variantes
                      </p>
                      {isEditMode
                        ? existingVariants.map((v) =>
                            editingVariantId === v.id ? (
                              // Modo edición inline: se puede corregir nombre,
                              // modificador de precio, stock y disponibilidad.
                              // El `type` queda fijo a propósito.
                              <div
                                key={v.id}
                                className="space-y-3 rounded-lg border border-blue-300 bg-blue-50/50 px-4 py-3"
                              >
                                <p className="text-xs font-medium text-muted-foreground capitalize">
                                  Editando variante de {v.type}
                                </p>
                                <div className="grid gap-2 sm:grid-cols-3">
                                  <div>
                                    <label className={labelClass}>Nombre</label>
                                    <input
                                      className={inputClass}
                                      value={variantEdit.name}
                                      onChange={(e) =>
                                        setVariantEdit((s) => ({
                                          ...s,
                                          name: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label className={labelClass}>
                                      Modificador ($)
                                    </label>
                                    <input
                                      type="number"
                                      className={inputClass}
                                      value={variantEdit.priceModifier}
                                      onChange={(e) =>
                                        setVariantEdit((s) => ({
                                          ...s,
                                          priceModifier: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label className={labelClass}>Stock</label>
                                    <input
                                      type="number"
                                      min={0}
                                      className={inputClass}
                                      value={variantEdit.stock}
                                      onChange={(e) =>
                                        setVariantEdit((s) => ({
                                          ...s,
                                          stock: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <input
                                    type="checkbox"
                                    checked={variantEdit.isAvailable}
                                    onChange={(e) =>
                                      setVariantEdit((s) => ({
                                        ...s,
                                        isAvailable: e.target.checked,
                                      }))
                                    }
                                  />
                                  Disponible para la venta
                                </label>
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => handleSaveVariantEdit(v.id)}
                                    disabled={updateVariant.isPending}
                                  >
                                    {updateVariant.isPending
                                      ? "Guardando..."
                                      : "Guardar"}
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelEditingVariant}
                                    disabled={updateVariant.isPending}
                                    className="bg-transparent"
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div
                                key={v.id}
                                className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3"
                              >
                                <div className="space-y-0.5">
                                  <p className="text-sm font-medium text-foreground">
                                    <span className="text-muted-foreground capitalize">
                                      {v.type}:
                                    </span>{" "}
                                    {v.name}
                                    {!v.isAvailable && (
                                      <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                                        No disponible
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Precio: {v.priceModifier >= 0 ? "+" : ""}$
                                    {v.priceModifier} · Stock: {v.stock}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => startEditingVariant(v)}
                                    className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                                    title="Editar variante"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteExistingVariant(v.id)
                                    }
                                    disabled={deleteVariant.isPending}
                                    className="rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                                    title="Eliminar variante"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )
                          )
                        : pendingVariants.map((v) => (
                            <div
                              key={v._key}
                              className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3"
                            >
                              <div className="space-y-0.5">
                                <p className="text-sm font-medium text-foreground">
                                  <span className="text-muted-foreground capitalize">
                                    {v.type}:
                                  </span>{" "}
                                  {v.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Precio:{" "}
                                  {Number(v.priceModifier) >= 0 ? "+" : ""}$
                                  {v.priceModifier} · Stock: {v.stock}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removePendingVariant(v._key)}
                                className="rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                    </div>
                  )}

                  {/* Mini-form para agregar variante */}
                  <div className="space-y-3 rounded-lg border border-border p-4">
                    <p className="text-sm font-semibold text-foreground">
                      {isEditMode ? "Agregar variante" : "Nueva variante"}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Tipo *</label>
                        <select
                          value={variantDraft.type}
                          onChange={(e) =>
                            setVariantDraft((d) => ({
                              ...d,
                              type: e.target.value,
                            }))
                          }
                          className={inputClass}
                        >
                          <option value="">Seleccionar...</option>
                          {Object.values(VariantType).map((vt) => (
                            <option key={vt} value={vt}>
                              {VARIANT_TYPE_LABELS[vt]}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Nombre *</label>
                        <input
                          type="text"
                          value={variantDraft.name}
                          onChange={(e) =>
                            setVariantDraft((d) => ({
                              ...d,
                              name: e.target.value,
                            }))
                          }
                          className={inputClass}
                          placeholder="Ej: 512GB SSD"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Modificador de precio
                        </label>
                        <input
                          type="number"
                          value={variantDraft.priceModifier}
                          onChange={(e) =>
                            setVariantDraft((d) => ({
                              ...d,
                              priceModifier: e.target.value,
                            }))
                          }
                          className={inputClass}
                          step={0.01}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Stock</label>
                        <input
                          type="number"
                          value={variantDraft.stock}
                          onChange={(e) =>
                            setVariantDraft((d) => ({
                              ...d,
                              stock: e.target.value,
                            }))
                          }
                          className={inputClass}
                          min={0}
                          step={1}
                          placeholder="0"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className={labelClass}>Descripción</label>
                        <input
                          type="text"
                          value={variantDraft.description}
                          onChange={(e) =>
                            setVariantDraft((d) => ({
                              ...d,
                              description: e.target.value,
                            }))
                          }
                          className={inputClass}
                          placeholder="Opcional..."
                          maxLength={200}
                        />
                      </div>

                      <label className="col-span-2 flex cursor-pointer items-center gap-2">
                        <Checkbox
                          checked={variantDraft.isAvailable}
                          onCheckedChange={(checked) =>
                            setVariantDraft((d) => ({
                              ...d,
                              isAvailable: checked === true,
                            }))
                          }
                        />
                        <span className="text-sm text-foreground">
                          Disponible
                        </span>
                      </label>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={
                        isEditMode
                          ? handleAddExistingVariant
                          : addPendingVariant
                      }
                      disabled={
                        !variantDraft.type ||
                        !variantDraft.name.trim() ||
                        addVariant.isPending
                      }
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {isEditMode ? "Agregar variante" : "Agregar a la lista"}
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          {/* ── FOOTER ── */}
          <div className="flex gap-3 border-t border-border pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending
                ? "Guardando..."
                : isEditMode
                  ? "Guardar Cambios"
                  : "Crear Producto"}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Borrado de imagen: confirmamos porque el back también elimina el
          archivo en Cloudinary — no se puede recuperar. */}
      <ActionDialog
        open={Boolean(deleteImageTarget)}
        onOpenChange={(open) => !open && setDeleteImageTarget(null)}
        title="¿Eliminar esta imagen?"
        description="Se borra del producto y del almacenamiento. Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteProductImage.isPending}
        onConfirm={async () => {
          if (!deleteImageTarget || !currentProduct) return;
          try {
            await deleteProductImage.mutateAsync({
              imageId: deleteImageTarget.id,
              productId: currentProduct.id,
            });
            // Sacamos la URL del estado local para que el submit no la
            // vuelva a mandar en imgUrls
            setCurrentImages((prev) =>
              prev.filter((url) => url !== deleteImageTarget.url)
            );
            setDeleteImageTarget(null);
          } catch {
            // el hook ya muestra el toast de error
          }
        }}
      />
    </Dialog>
  );
}
