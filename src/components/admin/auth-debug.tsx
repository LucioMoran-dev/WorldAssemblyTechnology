"use client";

import { useAuth } from "@/hooks";
import { authService } from "@/services";

/**
 * Componente temporal para debugging de autenticación
 * Muestra información del usuario, token y rol para diagnosticar problemas
 */
export function AuthDebug() {
  const { user, token, isAuthenticated } = useAuth();

  // También obtener del localStorage directamente
  const localStorageToken = authService.getToken();
  const localStorageUser = authService.getUser();

  return (
    <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4">
      <h3 className="mb-3 font-bold text-red-900">
        🔍 Debug de Autenticación
      </h3>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Estado Zustand:</strong>
          <pre className="mt-1 overflow-auto rounded bg-white p-2">
            {JSON.stringify(
              {
                isAuthenticated,
                hasToken: !!token,
                hasUser: !!user,
                userRole: user?.role || "N/A",
              },
              null,
              2
            )}
          </pre>
        </div>

        <div>
          <strong>LocalStorage Token:</strong>
          <pre className="mt-1 overflow-auto rounded bg-white p-2">
            {localStorageToken
              ? `${localStorageToken.substring(0, 50)}...`
              : "❌ No token"}
          </pre>
        </div>

        <div>
          <strong>LocalStorage User:</strong>
          <pre className="mt-1 overflow-auto rounded bg-white p-2">
            {JSON.stringify(localStorageUser, null, 2) || "❌ No user"}
          </pre>
        </div>

        <div>
          <strong>User del Zustand Store:</strong>
          <pre className="mt-1 overflow-auto rounded bg-white p-2">
            {JSON.stringify(user, null, 2) || "❌ No user"}
          </pre>
        </div>
      </div>
    </div>
  );
}
