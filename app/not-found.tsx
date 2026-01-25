import { ErrorPage } from "@/components/features/error/error-page";

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Página Não Encontrada"
      description="Parece que você se perdeu no randomizer. Esta página não existe ou foi movida para outra dimensão."
      statusLabel="Página Perdida"
    />
  );
}
