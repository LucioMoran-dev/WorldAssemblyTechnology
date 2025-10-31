"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountInfoPage() {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Driver",
    email: "ExampleAddress@gmail.com",
    changePassword: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Editar Información de Cuenta
      </h1>

      <div className="max-w-2xl">
        <form className="space-y-6">
          {/* Información de Cuenta */}
          <section className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-6 text-lg font-bold text-gray-900">
              Información de Cuenta
            </h2>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
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
                  />
                </div>
              </div>
            </section>
          )}

          {/* Botones de Acción */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Guardar Cambios
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard">Cancelar</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
