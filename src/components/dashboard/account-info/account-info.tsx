"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
      toast.error("El correo electrÃ³nico es obligatorio");
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

      // Si se marcÃ³ cambiar contraseÃ±a, validar y cambiarla
      if (formData.changePassword) {
        if (
          !formData.currentPassword ||
          !formData.newPassword ||
          !formData.confirmPassword
        ) {
          toast.error("Todos los campos de contraseÃ±a son obligatorios");
          return;
        }

        if (formData.newPassword.length < 8) {
          toast.error("La nueva contraseÃ±a debe tener al menos 8 caracteres");
          return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("Las contraseÃ±as no coinciden");
          return;
        }

        await changePassword.mutateAsync({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        });

        // Limpiar campos de contraseÃ±a despuÃ©s del cambio exitoso
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
      <h1 className="text-foreground text-3xl font-bold">
        Editar Informacion de Cuenta
      </h1>

      <div className="max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* InformaciÃ³n de Cuenta */}
          <section className="border-border rounded-lg border p-6">
            <h2 className="text-foreground mb-6 text-lg font-bold">
              Informacion de Cuenta
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
                <Label htmlFor="email">Correo ElectrÃ³nico *</Label>
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
                <p className="text-muted-foreground mt-1 text-xs">
                  Este correo serÃ¡ usado para iniciar sesiÃ³n y recibir
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
                  className="border-border rounded"
                  disabled={isLoading}
                />
                <Label
                  htmlFor="changePassword"
                  className="cursor-pointer font-normal"
                >
                  Cambiar ContraseÃ±a
                </Label>
              </div>
            </div>
          </section>

          {/* Cambiar ContraseÃ±a */}
          {formData.changePassword && (
            <section className="border-border rounded-lg border p-6">
              <h2 className="text-foreground mb-6 text-lg font-bold">
                Cambiar ContraseÃ±a
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">ContraseÃ±a Actual *</Label>
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
                  <Label htmlFor="newPassword">Nueva ContraseÃ±a *</Label>
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
                  <p className="text-muted-foreground mt-1 text-xs">
                    MÃ­nimo 8 caracteres, incluye mayÃºsculas, minÃºsculas y
                    nÃºmeros
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">
                    Confirmar Nueva ContraseÃ±a *
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

          {/* Botones de acciÃ³n */}
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
      </div>
    </div>
  );
}

export default AccountInfo;
