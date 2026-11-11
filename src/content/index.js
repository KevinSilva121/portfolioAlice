// Catálogo de conteúdo do site (gerado no build a partir dos .md em src/content).
// - *Meta: dados leves de todos os documentos, carregados junto com o site (listas, cards, SEO).
// - loadDoc(): carrega o HTML completo de um documento sob demanda (um arquivo JS por documento).

const metaOf = (modules) => Object.values(modules);

const blogMeta = metaOf(import.meta.glob('./blog/*.md', { query: '?meta', import: 'default', eager: true }));
const areaMeta = metaOf(import.meta.glob('./areas/*.md', { query: '?meta', import: 'default', eager: true }));
const serviceMeta = metaOf(import.meta.glob('./servicos/*.md', { query: '?meta', import: 'default', eager: true }));
const pageMeta = metaOf(import.meta.glob('./paginas/*.md', { query: '?meta', import: 'default', eager: true }));
const cityMeta = metaOf(import.meta.glob('./cidades/*.md', { query: '?meta', import: 'default', eager: true }));

const loaders = {
  blog: import.meta.glob('./blog/*.md', { import: 'default' }),
  areas: import.meta.glob('./areas/*.md', { import: 'default' }),
  servicos: import.meta.glob('./servicos/*.md', { import: 'default' }),
  paginas: import.meta.glob('./paginas/*.md', { import: 'default' }),
  cidades: import.meta.glob('./cidades/*.md', { import: 'default' }),
};

// Nomes das áreas caso o .md da área ainda não exista (usado em categorias de artigos).
const AREA_FALLBACK_TITLES = {
  'direito-trabalhista': 'Direito do Trabalho',
  'direito-previdenciario': 'Direito Previdenciário',
  'direito-civil': 'Direito Cível',
  'direito-de-familia': 'Direito de Família',
};

export const posts = [...blogMeta].sort((a, b) => new Date(b.date) - new Date(a.date));
export const areas = [...areaMeta].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
export const services = [...serviceMeta].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
// Páginas de atendimento por cidade (/advogada-taubate, /advogada-sao-jose-dos-campos...).
export const cities = [...cityMeta].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

const bySlug = (list) => Object.fromEntries(list.map((item) => [item.slug, item]));
const postsBySlug = bySlug(posts);
const areasBySlug = bySlug(areas);
const pagesBySlug = bySlug(pageMeta);
const citiesBySlug = bySlug(cities);

export const postPath = (slug) => `/blog/${slug}`;
export const areaPath = (slug) => `/${slug}`;
export const servicePath = (service) => `/${service.area}/${service.slug}`;
export const cityPath = (slug) => `/${slug}`;

export const getPost = (slug) => postsBySlug[slug];
export const getArea = (slug) => areasBySlug[slug];
export const getPage = (slug) => pagesBySlug[slug];
export const getCity = (slug) => citiesBySlug[slug];
export const getRecentPosts = (limit = 3) => posts.slice(0, limit);
export const getAreaTitle = (slug) => areasBySlug[slug]?.title || AREA_FALLBACK_TITLES[slug] || '';
export const postsInArea = (areaSlug) => posts.filter((post) => post.category === areaSlug);
export const servicesInArea = (areaSlug) => services.filter((service) => service.area === areaSlug);

export function relatedPosts(post, limit = 3) {
  const sameArea = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameArea, ...others].slice(0, limit);
}

export const normalizePath = (pathname) => {
  const path = decodeURI(pathname || '/').replace(/\/+$/, '');
  return path === '' ? '/' : path;
};

// Descobre o que existe em uma URL. Usado pelo roteador, pelo SEO e pelo pré-render.
export function resolveRoute(pathname) {
  const path = normalizePath(pathname);
  const fixed = {
    '/': 'home',
    '/blog': 'blog',
    '/contato': 'contact',
    '/obrigado': 'thanks',
  };
  if (fixed[path]) return { type: fixed[path], path };

  if (path === '/sobre' && pagesBySlug.sobre) return { type: 'about', path, meta: pagesBySlug.sobre, collection: 'paginas' };
  if (path === '/privacidade' && pagesBySlug.privacidade) {
    return { type: 'page', path, meta: pagesBySlug.privacidade, collection: 'paginas' };
  }

  let match = path.match(/^\/blog\/([^/]+)$/);
  if (match && postsBySlug[match[1]]) return { type: 'post', path, meta: postsBySlug[match[1]], collection: 'blog' };

  match = path.match(/^\/([^/]+)$/);
  if (match && areasBySlug[match[1]]) return { type: 'area', path, meta: areasBySlug[match[1]], collection: 'areas' };
  if (match && citiesBySlug[match[1]]) return { type: 'city', path, meta: citiesBySlug[match[1]], collection: 'cidades' };

  match = path.match(/^\/([^/]+)\/([^/]+)$/);
  if (match) {
    const service = services.find((s) => s.area === match[1] && s.slug === match[2]);
    if (service) return { type: 'service', path, meta: service, collection: 'servicos' };
  }

  return { type: 'notfound', path };
}

// Todas as URLs que o pré-render gera como HTML.
export function getAllPaths() {
  return [
    '/',
    '/blog',
    ...posts.map((p) => postPath(p.slug)),
    ...areas.map((a) => areaPath(a.slug)),
    ...services.map(servicePath),
    ...cities.map((c) => cityPath(c.slug)),
    ...(pagesBySlug.sobre ? ['/sobre'] : []),
    '/contato',
    ...(pagesBySlug.privacidade ? ['/privacidade'] : []),
    '/obrigado',
  ];
}

export function getBreadcrumbs(pathname) {
  const route = resolveRoute(pathname);
  const home = { name: 'Início', path: '/' };
  switch (route.type) {
    case 'blog':
      return [home, { name: 'Blog', path: '/blog' }];
    case 'post':
      return [home, { name: 'Blog', path: '/blog' }, { name: route.meta.title, path: route.path }];
    case 'area':
    case 'city':
      return [home, { name: route.meta.title, path: route.path }];
    case 'service':
      return [
        home,
        { name: getAreaTitle(route.meta.area), path: areaPath(route.meta.area) },
        { name: route.meta.title, path: route.path },
      ];
    case 'about':
      return [home, { name: 'Sobre', path: '/sobre' }];
    case 'contact':
      return [home, { name: 'Contato', path: '/contato' }];
    case 'page':
      return [home, { name: route.meta.title, path: route.path }];
    default:
      return [home];
  }
}

// Carrega o HTML completo de um documento. A promessa fica em cache e marcada com status,
// para o React (`use`) ler de forma síncrona quando já foi carregada (hidratação sem "piscar").
const docCache = new Map();

export function loadDoc(collection, slug) {
  const key = `${collection}/${slug}`;
  if (docCache.has(key)) return docCache.get(key);

  const loader = loaders[collection]?.[`./${collection}/${slug}.md`];
  if (!loader) return null;

  const promise = loader();
  promise.status = 'pending';
  promise.then(
    (value) => {
      promise.status = 'fulfilled';
      promise.value = value;
    },
    (reason) => {
      promise.status = 'rejected';
      promise.reason = reason;
    },
  );
  docCache.set(key, promise);
  return promise;
}

// Garante que o documento da URL está carregado antes de renderizar (pré-render e hidratação).
export async function preloadPath(pathname) {
  const route = resolveRoute(pathname);
  if (route.collection) await loadDoc(route.collection, route.meta.slug);
  return route;
}
