// Etapa final do build: gera o HTML pronto de cada página (com título, descrição, Open Graph e JSON-LD),
// a página 404, o sitemap.xml e as imagens de compartilhamento.
// Roda depois de `vite build` (navegador) e `vite build --ssr` (dist-ssr/entry-server.js).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderOgImage } from './og-images.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const server = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const { render, getAllPaths, resolveRoute, getAreaTitle, ogImagePath, SITE_URL } = server;

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(readFileSync(join(dist, '.vite', 'manifest.json'), 'utf8'));

// Pré-carrega as 2 fontes usadas no topo da página (título em Playfair 600, texto em Inter 400).
const assets = readdirSync(join(dist, 'assets'));
const fontPreloads = ['playfair-display-latin-600-normal', 'inter-latin-400-normal']
  .map((name) => assets.find((file) => file.startsWith(name) && file.endsWith('.woff2')))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ');

// Arquivo JS com o texto da página (artigo, área...), para o navegador baixar junto com o HTML.
function docPreload(route) {
  if (!route.collection) return '';
  const entry = manifest[`src/content/${route.collection}/${route.meta.slug}.md`];
  return entry ? `<link rel="modulepreload" href="/${entry.file}">` : '';
}

function outputFile(path) {
  return path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
}

async function writePage(path, file) {
  const { html, head, route } = await render(path);
  const headHtml = [head, fontPreloads, docPreload(route)].filter(Boolean).join('\n    ');
  const page = template.replace('<!--app-head-->', headHtml).replace('<!--app-html-->', html);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  return route;
}

// 1) Páginas
const paths = getAllPaths();
const routes = [];
for (const path of paths) {
  routes.push(await writePage(path, outputFile(path)));
}
// 2) 404 (o Firebase entrega este arquivo com status 404 para qualquer URL que não existe)
await writePage('/404', join(dist, '404.html'));
console.log(`pré-render: ${paths.length} páginas + 404.html`);

// 3) Sitemap (só páginas indexáveis)
const day = (value) => (value ? new Date(value).toISOString().slice(0, 10) : null);
const lastmodOf = (route) => {
  if (route.type === 'post') return day(route.meta.updated || route.meta.date);
  if (route.meta?.updated) return day(route.meta.updated);
  return null;
};
const postDates = routes.filter((r) => r.type === 'post').map(lastmodOf).filter(Boolean).sort();
const urls = routes
  .filter((route) => route.type !== 'thanks')
  .map((route) => {
    const lastmod = route.type === 'blog' ? postDates.at(-1) : lastmodOf(route);
    const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}  </url>`;
  });
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
console.log(`sitemap.xml: ${urls.length} URLs`);

// 4) Imagens de compartilhamento
function ogSpec(route) {
  const m = route.meta;
  switch (route.type) {
    case 'home':
      return { big: true, kicker: 'Advocacia · OAB/SP 529.641', title: 'Alice Gabriela Camargo', subtitle: 'Direito do Trabalho, Previdenciário, Cível e de Família · Taubaté e online' };
    case 'blog':
      return { kicker: 'Blog Jurídico', title: 'Informação clara para proteger os seus direitos' };
    case 'post':
      return { kicker: `Blog Jurídico${m.category ? ` · ${getAreaTitle(m.category)}` : ''}`, title: m.title };
    case 'area':
      return { kicker: 'Área de atuação', title: m.headline || m.title, subtitle: 'Taubaté e região · Online em todo o Brasil' };
    case 'service':
      return { kicker: getAreaTitle(m.area), title: m.headline || m.title };
    case 'about':
      return { big: true, kicker: 'Sobre', title: 'Dra. Alice Gabriela Camargo', subtitle: 'Advogada · Graduada pela UNITAU' };
    case 'contact':
      return { kicker: 'Contato', title: 'Fale com a Dra. Alice', subtitle: 'WhatsApp, telefone, e-mail ou formulário' };
    case 'page':
      return { kicker: 'Alice Camargo Advocacia', title: m.title };
    default:
      return null;
  }
}

let ogCount = 0;
for (const route of routes) {
  const spec = ogSpec(route);
  if (!spec) continue;
  await renderOgImage(spec, join(dist, ogImagePath(route.path).slice(1)));
  ogCount += 1;
}
console.log(`imagens de compartilhamento: ${ogCount}`);

// 5) Limpeza: o build do servidor e o manifest não vão para o ar.
rmSync(ssrDir, { recursive: true, force: true });
if (existsSync(join(dist, '.vite'))) rmSync(join(dist, '.vite'), { recursive: true, force: true });

// Confere que toda URL resolvida é a esperada (protege contra rotas quebradas no build).
const broken = paths.filter((path) => resolveRoute(path).type === 'notfound');
if (broken.length) {
  console.error('URLs sem conteúdo:', broken);
  process.exit(1);
}
