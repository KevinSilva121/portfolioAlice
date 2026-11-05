import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import fm from 'front-matter'

const SITE_URL = 'https://advalicecamargo.com.br'
const BLOG_DIR = fileURLToPath(new URL('./src/content/blog', import.meta.url))

// Gera dist/sitemap.xml no build a partir dos posts em src/content/blog.
// Post novo entra no sitemap automaticamente no próximo deploy.
function sitemap() {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const toDay = (d) => new Date(d).toISOString().slice(0, 10)

      const posts = readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
          const { attributes } = fm(readFileSync(`${BLOG_DIR}/${file}`, 'utf8'))
          return {
            loc: `/blog/${file.replace(/\.md$/, '')}`,
            lastmod: attributes.date ? toDay(attributes.date) : undefined,
          }
        })

      const latestPost = posts.map((p) => p.lastmod).filter(Boolean).sort().at(-1)
      const urls = [{ loc: '/' }, { loc: '/blog', lastmod: latestPost }, ...posts]

      const body = urls
        .map(({ loc, lastmod }) =>
          `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n` +
          (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
          '  </url>')
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap()],
  base: '/', // Domínio personalizado — base sempre na raiz
})
