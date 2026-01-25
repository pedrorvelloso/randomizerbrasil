"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/features/error/error-page";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <ErrorPage
      code="500"
      title="Erro Interno"
      description="Algo deu errado no servidor. Nossa equipe foi notificada e está trabalhando para resolver o problema."
      statusLabel="Falha no Sistema"
    />
  );
}
