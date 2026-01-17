"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useUpdateProfile, useChangePassword } from "@/hooks";

function AccountInfo() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

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

    if (!formData.email.trim()) {
      toast.error("El correo electrónico es obligatorio");
      return;
    }

    // Actualizar perfil
    try {
      await updateProfile.mutateAsync({
        id: user?.id || "",
        name: formData.name,
        email: formData.email,
        birthDate: user?.birthDate || new Date(),
        phone: user?.phone || "",
        addresses: user?.addresses?.[0] || "",
        username: user?.username || "",
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
      <h1 className="text-3xl font-bold text-gray-900">
        Editar Información de Cuenta
      </h1>

      <div className="max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Información de Cuenta */}
          <section className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-6 text-lg font-bold text-gray-900">
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
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1"
                  disabled={isLoading}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Este correo será usado para iniciar sesión y recibir
                  notificaciones
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
                  className="rounded border-gray-300"
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
            <section className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-6 text-lg font-bold text-gray-900">
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
                  <p className="mt-1 text-xs text-gray-500">
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
            <Button type="button" variant="outline" disabled={isLoading} asChild>
              <Link href="/dashboard">Volver al Dashboard</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountInfo;
