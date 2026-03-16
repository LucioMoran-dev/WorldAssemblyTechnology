"use client";

import { Suspense } from "react";

import { ResetPasswordContent } from "@/components/auth/reset-password/form/form-reset-password";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          Cargando...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
