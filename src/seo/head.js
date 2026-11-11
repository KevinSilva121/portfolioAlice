// Monta as tags do <head> de cada URL (título, descrição, canônica, Open Graph, JSON-LD).
// Usado no build (pré-render, vira HTML estático) e no navegador (troca de página sem recarregar).
import { SITE, SITE_URL } from '../config/site';
import { getAreaTitle, getBreadcrumbs, resolveRoute } from '../content';
import * as schema from './schema';
import heroBackground from '../assets/img/bg-law.webp';

const SUFFIX = ' | Alice Camargo Advocacia';
const withSuffix = (text) => (text.length + SUFFIX.length <= 70 ? text + SUFFIX : text);

// Imagem de compartilhamento gerada no build para cada URL (scripts/og-images.js).
export const ogImagePath = (path) => `/og${path === '/' ? '/index' : path}.jpg`;

function describe(route) {
  const { meta } = route;
  switch (route.type) {
    case 'home':
      return { title: SITE.defaultTitle, description: SITE.defaultDescription };
    case 'blog':
      return {
        title: `Blog Jurídico${SUFFIX}`,
        description: 'Informação clara, direta e preventiva para proteger o seu patrimônio financeiro e familiar.',
      };
    case 'post':
      return { title: meta.seoTitle || withSuffix(meta.title), description: meta.description || meta.excerpt, type: 'article' };
    case 'area':
    case 'service':
    case 'city':
      return { title: meta.seoTitle || withSuffix(meta.headline || meta.title), description: meta.description };
    case 'about':
    case 'page':
      return { title: meta.seoTitle || withSuffix(meta.title), description: meta.description };
    case 'contact':
      return {
        title: `Contato${SUFFIX}`,
        description: `Fale com a ${SITE.lawyerShort} pelo WhatsApp, e-mail ou formulário. Atendimento presencial com agendamento em Taubaté e região e online em todo o Brasil.`,
      };
    case 'thanks':
      return { title: `Mensagem enviada${SUFFIX}`, description: 'Sua mensagem foi enviada.', noindex: true };
    default:
      return { title: `Página não encontrada${SUFFIX}`, description: 'A página que você procurou não existe ou mudou de endereço.', noindex: true };
  }
}

function structuredData(route, url, image) {
  const crumbs = route.type === 'home' ? null : schema.breadcrumbList(getBreadcrumbs(route.path));
  switch (route.type) {
    case 'home':
      return schema.graph(schema.website(), schema.legalService(), schema.person());
    case 'blog':
      return schema.graph(schema.blog(url), crumbs);
    case 'post':
      return schema.graph(schema.blogPosting(route.meta, url, image), crumbs);
    case 'area':
      return schema.graph(schema.service(route.meta, url, route.meta.title), crumbs);
    case 'service':
      return schema.graph(schema.service(route.meta, url, getAreaTitle(route.meta.area)), crumbs);
    case 'city':
      return schema.graph(schema.cityService(route.meta, url), crumbs);
    case 'about':
      return schema.graph(schema.profilePage(url), crumbs);
    case 'contact':
      return schema.graph(schema.contactPage(url), crumbs);
    case 'page':
      return schema.graph(crumbs);
    default:
      return null;
  }
}

export function buildHead(pathname) {
  const route = resolveRoute(pathname);
  const { title, description, type = 'website', noindex = false } = describe(route);
  const url = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const image = `${SITE_URL}${ogImagePath(route.path)}`;
  const indexable = !noindex && route.type !== 'notfound';

  const tags = [
    { tag: 'meta', attrs: { name: 'description', content: description } },
    { tag: 'meta', attrs: { name: 'robots', content: indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow' } },
  ];

  if (indexable) {
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: url } },
      { tag: 'meta', attrs: { property: 'og:type', content: type } },
      { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.brand } },
      { tag: 'meta', attrs: { property: 'og:locale', content: 'pt_BR' } },
      { tag: 'meta', attrs: { property: 'og:url', content: url } },
      { tag: 'meta', attrs: { property: 'og:title', content: title } },
      { tag: 'meta', attrs: { property: 'og:description', content: description } },
      { tag: 'meta', attrs: { property: 'og:image', content: image } },
      { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
      { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: title } },
      { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    );
    if (route.type === 'post') {
      tags.push(
        { tag: 'meta', attrs: { property: 'article:published_time', content: route.meta.date } },
        { tag: 'meta', attrs: { property: 'article:modified_time', content: route.meta.updated || route.meta.date } },
        { tag: 'meta', attrs: { property: 'article:author', content: `${SITE_URL}/sobre` } },
      );
    }
    const data = structuredData(route, url, image);
    if (data) tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON.stringify(data) });
  }

  if (route.type === 'home') {
    // A imagem de fundo do topo é o primeiro elemento grande da home: pede ao navegador para baixá-la cedo.
    tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'image', href: heroBackground, fetchpriority: 'high' } });
  }

  return { title, tags, route };
}

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Versão em texto para o pré-render. data-head marca as tags que o navegador troca ao mudar de página.
export function serializeHead({ title, tags }) {
  const lines = [`<title>${escapeHtml(title)}</title>`];
  for (const { tag, attrs, content } of tags) {
    const attrText = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
      .join(' ');
    if (tag === 'script') {
      lines.push(`<script ${attrText} data-head>${content.replace(/</g, '\\u003c')}</script>`);
    } else {
      lines.push(`<${tag} ${attrText} data-head>`);
    }
  }
  return lines.join('\n    ');
}
