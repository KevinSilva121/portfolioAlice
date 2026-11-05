import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { preloadPath } from './content'

// Fontes servidas pelo próprio site (só os pesos usados e só caracteres latinos).
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-400-italic.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-700.css'
import './index.css'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// As páginas chegam prontas do build (HTML pré-renderizado): o React só "acorda" o que já está na tela.
// Antes, carrega o texto da página atual para o HTML do React bater com o que já foi pintado.
preloadPath(window.location.pathname)
  .catch(() => {})
  .finally(() => {
    if (container.firstElementChild) {
      hydrateRoot(container, app)
    } else {
      createRoot(container).render(app)
    }
  })
