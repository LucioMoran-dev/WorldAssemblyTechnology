"use client";

import { Loader2 } from "lucide-react";
import { Suspense } from "react";

import { AuthCallbackContent } from "@/components/auth/callback/auth-callback-content";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
