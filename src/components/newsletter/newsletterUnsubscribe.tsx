"use client";

import { Suspense } from "react";

import { UnsubscribeContent } from "@/components/newsletter/unsubscribeContent";

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          Cargando...
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
