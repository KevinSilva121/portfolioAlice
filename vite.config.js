import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import contentPlugin from './scripts/content-plugin.js'

// https://vite.dev/config/
// Build completo (npm run build):
//   1. vite build                          -> dist/ (site para o navegador)
//   2. vite build --ssr src/entry-server   -> dist-ssr/ (só para gerar o HTML)
//   3. node scripts/prerender.js           -> HTML de cada página, 404, sitemap e imagens de compartilhamento
export default defineConfig({
  plugins: [react(), contentPlugin()],
  base: '/', // Domínio personalizado — base sempre na raiz
  build: {
    manifest: true,
  },
})
