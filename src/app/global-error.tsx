"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#fafafa",
          color: "#18181b",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "5rem",
            width: "5rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1rem",
            background: "#f59e0b",
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: 700,
          }}
          aria-hidden="true"
        >
          !
        </div>

        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, margin: 0 }}>
          Error critico
        </h1>

        <p
          style={{
            maxWidth: "32rem",
            color: "#52525b",
            fontSize: "0.95rem",
            margin: 0,
          }}
        >
          La aplicacion no pudo cargarse. Reintenta; si el problema persiste,
          volve a entrar en unos minutos.
        </p>

        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            cursor: "pointer",
            borderRadius: "0.5rem",
            border: "none",
            background: "#f59e0b",
            padding: "0.65rem 1.25rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Reintentar
        </button>

        {error.digest ? (
          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "0.75rem",
              color: "#71717a",
            }}
          >
            Codigo de error: {error.digest}
          </p>
        ) : null}
      </body>
    </html>
  );
}
