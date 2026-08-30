"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ActionDialog } from "@/components/ui/action-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAuth,
  useUpdateProfile,
  useChangePassword,
  useDeleteMyAccount,
} from "@/hooks";

function AccountInfo() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const deleteAccount = useDeleteMyAccount();

  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    changePassword: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Cargar datos del usuario cuando se monte el componente o cambie el usuario
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    // Actualizar perfil
    try {
      // Solo `name`: el back NO acepta `email` en este endpoint (whitelist
      // estricta → 400). El email es la identidad de login y no se cambia
      // desde acá; por eso el input está deshabilitado.
      await updateProfile.mutateAsync({
        name: formData.name,
      });

      // Si se marcó cambiar contraseña, validar y cambiarla
      if (formData.changePassword) {
        if (
          !formData.currentPassword ||
          !formData.newPassword ||
          !formData.confirmPassword
        ) {
          toast.error("Todos los campos de contraseña son obligatorios");
          return;
        }

        if (formData.newPassword.length < 8) {
          toast.error("La nueva contraseña debe tener al menos 8 caracteres");
          return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("Las contraseñas no coinciden");
          return;
        }

        await changePassword.mutateAsync({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        });

        // Limpiar campos de contraseña después del cambio exitoso
        setFormData((prev) => ({
          ...prev,
          changePassword: false,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error) {
      // Los errores ya se manejan en los hooks con toast
      console.error("Error al actualizar:", error);
    }
  };

  const isLoading = updateProfile.isPending || changePassword.isPending;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Editar Información de Cuenta
      </h1>

      <div className="max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Información de Cuenta */}
          <section className="rounded-lg border border-border p-6">
            <h2 className="mb-6 text-lg font-bold text-foreground">
              Información de Cuenta
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                {/* Solo lectura: el back no permite cambiar el email en
                    PUT /users/update/user (es la identidad de login). */}
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  className="mt-1"
                  disabled
                  readOnly
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Tu correo de inicio de sesión no puede modificarse desde acá.
                  Si necesitás cambiarlo, escribinos desde Contacto.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="changePassword"
                  checked={formData.changePassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      changePassword: e.target.checked,
                    })
                  }
                  className="rounded border-border"
                  disabled={isLoading}
                />
                <Label
                  htmlFor="changePassword"
                  className="cursor-pointer font-normal"
                >
                  Cambiar Contraseña
                </Label>
              </div>
            </div>
          </section>

          {/* Cambiar Contraseña */}
          {formData.changePassword && (
            <section className="rounded-lg border border-border p-6">
              <h2 className="mb-6 text-lg font-bold text-foreground">
                Cambiar Contraseña
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Contraseña Actual *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="mt-1"
                    disabled={isLoading}
                    required={formData.changePassword}
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">Nueva Contraseña *</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    className="mt-1"
                    disabled={isLoading}
                    required={formData.changePassword}
                    minLength={8}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Mínimo 8 caracteres, incluye mayúsculas, minúsculas y
                    números
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">
                    Confirmar Nueva Contraseña *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="mt-1"
                    disabled={isLoading}
                    required={formData.changePassword}
                    minLength={8}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Botones de acción */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                if (user) {
                  setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    changePassword: false,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }
              }}
            >
              Restablecer
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              asChild
            >
              <Link href="/dashboard">Volver al Dashboard</Link>
            </Button>
          </div>
        </form>

        {/* Zona de peligro: baja de la propia cuenta. El back hace soft
            delete; tras confirmar cerramos sesión y volvemos al inicio. */}
        <section className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-bold text-red-900">
            Eliminar mi cuenta
          </h2>
          <p className="mb-4 text-sm text-red-800">
            Se cerrará tu sesión y perderás el acceso a tus pedidos, favoritos y
            direcciones guardadas. Esta acción no se puede deshacer desde la
            tienda.
          </p>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsDeleteAccountOpen(true)}
            disabled={isLoading || deleteAccount.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar mi cuenta
          </Button>
        </section>
      </div>

      <ActionDialog
        open={isDeleteAccountOpen}
        onOpenChange={(open) => !open && setIsDeleteAccountOpen(false)}
        title="¿Eliminar tu cuenta?"
        description="Vas a perder el acceso a tus pedidos, favoritos y direcciones. Escribí ELIMINAR para confirmar."
        confirmLabel="Eliminar cuenta"
        variant="destructive"
        isPending={deleteAccount.isPending}
        // Confirmación por tipeo: evita borrados accidentales de un click
        confirmDisabled={deleteConfirmText.trim().toUpperCase() !== "ELIMINAR"}
        onConfirm={() => {
          if (user?.id) deleteAccount.mutate(user.id);
        }}
      >
        <Input
          value={deleteConfirmText}
          onChange={(e) => setDeleteConfirmText(e.target.value)}
          placeholder="ELIMINAR"
          autoFocus
        />
      </ActionDialog>
    </div>
  );
}

export default AccountInfo;
