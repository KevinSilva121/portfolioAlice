// Entrada usada só no build (pré-render): gera o HTML de cada página.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { preloadPath } from './content'
import { buildHead, serializeHead } from './seo/head'

export { getAllPaths, resolveRoute, getAreaTitle } from './content'
export { ogImagePath } from './seo/head'
export { SITE, SITE_URL } from './config/site'

export async function render(url) {
  await preloadPath(url)
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  const head = buildHead(url)
  return { html, head: serializeHead(head), route: head.route, title: head.title }
}
