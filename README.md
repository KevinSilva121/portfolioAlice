# ⚖️ Alice Gabriela Camargo — Site Institucional

> **Site oficial da advogada Alice Gabriela Camargo**  
> 🌐 Acesse em: [advalicecamargo.com.br](https://advalicecamargo.com.br)

---

## 📋 Sobre o Projeto

Site institucional e portfólio profissional da **Dra. Alice Gabriela Camargo** (OAB/SP 529.641), desenvolvido para apresentar sua atuação jurídica, facilitar o contato de clientes e publicar conteúdo educativo sobre direito.

O site foi construído com foco em **elegância, performance e experiência do usuário**, refletindo a seriedade e o profissionalismo da advocacia especializada.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| [React 19](https://react.dev/) | Framework principal |
| [Vite 8](https://vitejs.dev/) | Build tool e dev server |
| [React Router DOM v7](https://reactrouter.com/) | Roteamento (SPA com HashRouter) |
| [Framer Motion](https://www.framer-motion.com/) | Animações e transições |
| [Lucide React](https://lucide.dev/) | Ícones vetoriais |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Renderização dos posts do blog |
| [React Scroll](https://github.com/fisshy/react-scroll) | Navegação suave entre seções |
| [GitHub Pages](https://pages.github.com/) | Hospedagem e deploy |
| CSS Vanilla | Estilização customizada |

---

## 📂 Estrutura do Projeto

```
portfolio-alice/
├── public/
│   └── admin/
│       └── config.yml        # Configuração do Decap CMS
├── src/
│   ├── assets/               # Imagens e recursos estáticos
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Navbar.jsx        # Barra de navegação
│   │   ├── Hero.jsx          # Seção principal (banner)
│   │   ├── About.jsx         # Sobre a advogada
│   │   ├── Expertise.jsx     # Áreas de atuação
│   │   ├── BlogSection.jsx   # Preview do blog na landing page
│   │   ├── FAQ.jsx           # Perguntas frequentes
│   │   ├── UsefulLinks.jsx   # Links úteis (portais jurídicos)
│   │   ├── ContactForm.jsx   # Formulário de contato
│   │   ├── FloatingWhatsApp.jsx # Botão flutuante do WhatsApp
│   │   ├── CustomCursor.jsx  # Cursor personalizado
│   │   └── Footer.jsx        # Rodapé
│   ├── pages/
│   │   ├── BlogList.jsx      # Página com todos os artigos
│   │   └── BlogPost.jsx      # Página individual de artigo
│   ├── content/
│   │   └── blog/             # Artigos em formato Markdown (.md)
│   ├── App.jsx               # Componente raiz e rotas
│   └── main.jsx              # Ponto de entrada da aplicação
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎯 Seções do Site

| Seção | Descrição |
|---|---|
| **Hero** | Banner principal com chamada para ação e animações de partículas |
| **Sobre** | Apresentação da Dra. Alice, sua formação e valores |
| **Áreas de Atuação** | Direito do Trabalho, Previdenciário, Cível e de Família |
| **Blog** | Artigos jurídicos voltados à educação e orientação do cidadão |
| **FAQ** | Perguntas frequentes sobre processos e atendimentos |
| **Links Úteis** | Portais e sites oficiais do sistema jurídico brasileiro |
| **Contato** | Formulário para solicitar análise de caso |

---

## 📰 Blog Jurídico

Os artigos do blog são escritos em **Markdown** e ficam na pasta `src/content/blog/`. O site já conta com os seguintes artigos publicados:

- 📄 Direitos Trabalhistas no Home Office
- 📄 Direitos em Caso de Atraso de Voo
- 📄 Distrato de Imóvel
- 📄 Guarda Compartilhada
- 📄 A Importância da Assessoria Jurídica
- 📄 Planejamento Previdenciário

Para **publicar um novo artigo**, basta criar um arquivo `.md` na pasta `src/content/blog/` seguindo o padrão de frontmatter já utilizado nos arquivos existentes.

---

## ⚙️ Como Rodar Localmente

**Pré-requisitos:** Node.js 18+ e npm instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/portfolio-alice.git
cd portfolio-alice

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## 🚀 Deploy

O site é hospedado no **GitHub Pages** e o deploy é feito via `gh-pages`.

```bash
# Gera o build de produção e faz o deploy automaticamente
npm run deploy
```

O comando `npm run deploy`:
1. Executa `npm run build` (gera a pasta `dist/`)
2. Publica o conteúdo de `dist/` na branch `gh-pages`
3. O GitHub Pages serve o site em `advalicecamargo.com.br`

---

## 🧑‍💼 Contato Profissional

| Canal | Informação |
|---|---|
| 🌐 Site | [advalicecamargo.com.br](https://advalicecamargo.com.br) |
| ⚖️ OAB | OAB/SP 529.641 |

---

## 📄 Licença

Este projeto é de uso **privado e exclusivo** da Dra. Alice Gabriela Camargo. Todos os direitos reservados.
