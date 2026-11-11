// Dados estruturados (JSON-LD / schema.org) para o Google entender quem é a advogada,
// onde atende, quem escreve os artigos e a hierarquia das páginas.
import { SITE, SITE_URL } from '../config/site';
import { areas } from '../content';

const ORG_ID = `${SITE_URL}/#escritorio`;
const PERSON_ID = `${SITE_URL}/#alice`;
const WEBSITE_ID = `${SITE_URL}/#site`;
const PHOTO = `${SITE_URL}/alice.png`;

const areaServed = [
  { '@type': 'City', name: SITE.city },
  // Cidades vizinhas atendidas (presencial com agendamento na região ou online).
  { '@type': 'City', name: 'São José dos Campos' },
  { '@type': 'City', name: 'Tremembé' },
  { '@type': 'City', name: 'Pindamonhangaba' },
  { '@type': 'City', name: 'Caçapava' },
  { '@type': 'AdministrativeArea', name: SITE.region },
  { '@type': 'Country', name: 'Brasil' },
];

const knowsAbout = () =>
  areas.length ? areas.map((a) => a.title) : ['Direito do Trabalho', 'Direito Previdenciário', 'Direito Cível', 'Direito de Família'];

export const personRef = { '@id': PERSON_ID };
export const orgRef = { '@id': ORG_ID };

export const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE.brand,
  inLanguage: 'pt-BR',
  publisher: orgRef,
});

export const person = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.lawyer,
  honorificPrefix: 'Dra.',
  jobTitle: 'Advogada',
  url: `${SITE_URL}/sobre`,
  image: PHOTO,
  email: `mailto:${SITE.email}`,
  telephone: SITE.phoneE164,
  alumniOf: { '@type': 'CollegeOrUniversity', name: SITE.university },
  identifier: { '@type': 'PropertyValue', propertyID: `OAB/${SITE.oabState}`, value: SITE.oabNumber },
  knowsAbout: knowsAbout(),
  worksFor: orgRef,
  sameAs: [SITE.linkedin],
});

export const legalService = () => ({
  '@type': 'LegalService',
  '@id': ORG_ID,
  name: SITE.brand,
  url: `${SITE_URL}/`,
  image: PHOTO,
  telephone: SITE.phoneE164,
  email: SITE.email,
  // Atende por área (presencial com agendamento na região + online): só a cidade, sem endereço.
  address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.state, addressCountry: 'BR' },
  areaServed,
  knowsAbout: knowsAbout(),
  founder: personRef,
  employee: personRef,
  sameAs: [SITE.googleProfile, SITE.linkedin],
});

export const breadcrumbList = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE_URL}${crumb.path === '/' ? '/' : crumb.path}`,
  })),
});

export const blogPosting = (post, url, image) => ({
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description || post.excerpt,
  url,
  mainEntityOfPage: url,
  image,
  datePublished: post.date,
  dateModified: post.updated || post.date,
  inLanguage: 'pt-BR',
  wordCount: post.words,
  author: { '@type': 'Person', name: SITE.lawyer, url: `${SITE_URL}/sobre`, jobTitle: 'Advogada' },
  publisher: { '@type': 'Organization', name: SITE.brand, url: `${SITE_URL}/` },
});

export const service = (doc, url, areaTitle) => ({
  '@type': 'Service',
  name: doc.title,
  serviceType: areaTitle || doc.title,
  description: doc.description,
  url,
  areaServed,
  provider: { '@type': 'LegalService', name: SITE.brand, url: `${SITE_URL}/` },
});

// Página de atendimento em uma cidade: o serviço advocatício com a cidade como área atendida.
export const cityService = (doc, url) => ({
  '@type': 'Service',
  name: doc.title,
  serviceType: doc.serviceType || 'Serviços advocatícios',
  description: doc.description,
  url,
  areaServed: { '@type': 'City', name: doc.city, containedInPlace: { '@type': 'State', name: 'São Paulo' } },
  provider: orgRef,
});

export const blog = (url) => ({
  '@type': 'Blog',
  name: `Blog Jurídico | ${SITE.brand}`,
  url,
  inLanguage: 'pt-BR',
  publisher: { '@type': 'Organization', name: SITE.brand, url: `${SITE_URL}/` },
});

export const profilePage = (url) => ({
  '@type': 'ProfilePage',
  url,
  mainEntity: person(),
});

export const contactPage = (url) => ({
  '@type': 'ContactPage',
  url,
  about: { '@type': 'LegalService', name: SITE.brand, telephone: SITE.phoneE164, email: SITE.email },
});

export const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });
