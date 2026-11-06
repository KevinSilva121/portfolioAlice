// Dados do escritório usados em todo o site, nos dados estruturados (Google)
// e nas imagens de compartilhamento. Alterar aqui atualiza tudo no próximo build.

export const SITE_URL = 'https://advalicecamargo.com.br';

export const SITE = {
  brand: 'Alice Camargo Advocacia',
  lawyer: 'Alice Gabriela Camargo',
  lawyerShort: 'Dra. Alice Camargo',
  oab: 'OAB/SP 529.641',
  oabNumber: '529.641',
  oabState: 'SP',
  phoneDisplay: '(12) 99774-8723',
  phoneE164: '+5512997748723',
  whatsappNumber: '5512997748723',
  email: 'alicegabrielacamargo@adv.oabsp.org.br',
  city: 'Taubaté',
  state: 'SP',
  region: 'Vale do Paraíba',
  // Atendimento presencial com agendamento na região; online em todo o Brasil. Sem endereço público.
  serviceAreaText: 'Presencial com agendamento em Taubaté e região · Online em todo o Brasil',
  university: 'Universidade de Taubaté (UNITAU)',
  linkedin: 'https://www.linkedin.com/in/alice-gabriela-camargo-93ba7819a/',
  googleProfile: 'https://www.google.com/search?kgmid=/g/11n9s4nj1p',
  defaultTitle: 'Alice Gabriela Camargo - Advocacia Especializada',
  defaultDescription:
    'Advogada em Taubaté e região, com atendimento online em todo o Brasil. Direito do Trabalho, Previdenciário (INSS), Cível e de Família. OAB/SP 529.641.',
};

// Envio do formulário de contato para a função do Firebase (functions/index.js), no próprio domínio.
// O site envia em segundo plano, com tempo-limite e alternativa por WhatsApp/e-mail se falhar;
// sem JavaScript, o navegador envia direto e é levado para /obrigado.
export const CONTACT_FORM = {
  endpoint: '/api/contato',
  timeoutMs: 15000,
};

export const whatsappLink =(message = 'Olá Dra. Alice! Gostaria de agendar uma consulta.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
