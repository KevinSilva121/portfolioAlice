// Datas sempre no fuso de São Paulo: o HTML gerado no build e o do navegador ficam iguais.
const FORMATS = {
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  short: { year: 'numeric', month: 'short', day: 'numeric' },
};

export function formatDate(value, style = 'long') {
  if (!value) return '';
  return new Date(value).toLocaleDateString('pt-BR', { ...FORMATS[style], timeZone: 'America/Sao_Paulo' });
}

export const readingTimeLabel = (minutes) => `${minutes} min de leitura`;
