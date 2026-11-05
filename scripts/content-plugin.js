// Plugin do Vite: transforma os arquivos .md de src/content em módulos JS no build.
//   import doc from './blog/x.md'        -> { ...frontmatter, slug, collection, words, readingTime, html, headings }
//   import meta from './blog/x.md?meta'  -> o mesmo sem html/headings (leve, para listas e cards)
// O Markdown é convertido em HTML aqui (Node), então nem o parser de Markdown nem o de YAML vão para o navegador.
import { readFileSync } from 'node:fs';
import { basename, dirname } from 'node:path';
import fm from 'front-matter';
import { Marked, Renderer } from 'marked';

const SITE_HOST = 'advalicecamargo.com.br';

export const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const escapeAttr = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function renderMarkdown(body) {
  const headings = [];
  const usedIds = new Map();

  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const text = html.replace(/<[^>]+>/g, '');
        let id = slugify(text) || 'secao';
        const count = usedIds.get(id) || 0;
        usedIds.set(id, count + 1);
        if (count) id += `-${count}`;
        if (depth === 2 || depth === 3) headings.push({ id, text, level: depth });
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const url = href.replace(/^http:\/\//, 'https://');
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
        const external = /^https?:\/\//.test(url) && !url.includes(SITE_HOST);
        const extra = external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${escapeAttr(url)}"${titleAttr}${extra}>${text}</a>`;
      },
      table(token) {
        // Tabela dentro de um wrapper rolável para não estourar no celular.
        const html = Renderer.prototype.table.call(this, token);
        return `<div class="table-wrap">${html}</div>`;
      },
    },
  });

  return { html: marked.parse(body), headings };
}

function toPlain(value) {
  // Datas do YAML viram string ISO; o resto passa direto.
  return JSON.parse(JSON.stringify(value));
}

export default function contentPlugin() {
  return {
    name: 'site-content',
    enforce: 'pre',
    load(id) {
      const [file, query = ''] = id.split('?');
      if (!file.endsWith('.md') || !file.includes('/src/content/')) return null;

      this.addWatchFile(file);
      const { attributes, body } = fm(readFileSync(file, 'utf8'));
      const words = body.split(/\s+/).filter(Boolean).length;
      const meta = toPlain({
        ...attributes,
        slug: basename(file, '.md'),
        collection: basename(dirname(file)),
        words,
        readingTime: Math.max(1, Math.round(words / 200)),
      });

      if (new URLSearchParams(query).has('meta')) {
        // O catálogo vai para o navegador em toda página: só o necessário para listas, menu e SEO.
        // Perguntas frequentes e textos de chamada ficam no arquivo da própria página.
        const { faqs: _faqs, whatsapp: _whatsapp, intro: _intro, ...light } = meta;
        return `export default ${JSON.stringify(light)};`;
      }
      const { html, headings } = renderMarkdown(body);
      return `export default ${JSON.stringify({ ...meta, html, headings })};`;
    },
  };
}
