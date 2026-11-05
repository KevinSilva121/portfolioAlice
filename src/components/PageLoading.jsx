// Mostrado por um instante enquanto o texto de uma página é baixado (só em trocas de página).
export default function PageLoading() {
  return <main className="page-loading" aria-busy="true" aria-label="Carregando" />;
}
