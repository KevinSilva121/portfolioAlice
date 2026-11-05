# ⚖️ Alice Gabriela Camargo — Site Institucional

> **Site oficial da advogada Alice Gabriela Camargo** (OAB/SP 529.641)
> 🌐 [advalicecamargo.com.br](https://advalicecamargo.com.br)

Site institucional com áreas de atuação, páginas de serviços, blog jurídico e contato. Cada página é **gerada como HTML pronto no build** (pré-renderização), com título, descrição, Open Graph e dados estruturados próprios, e depois "acorda" no navegador como um app React.

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 + React Router 7 | Interface e rotas (BrowserRouter no navegador, StaticRouter no build) |
| Vite 8 | Build e servidor de desenvolvimento |
| Framer Motion (`LazyMotion`) | Animações do topo e do cursor |
| Markdown + frontmatter | Conteúdo (artigos, áreas, serviços, páginas), convertido em HTML no build |
| satori + resvg + sharp | Imagens de compartilhamento (1200×630) geradas no build |
| Firebase Hosting | Hospedagem |

---

## 📂 Onde fica cada coisa

```
src/
├── config/site.js        # Nome, OAB, telefone, e-mail, redes: muda tudo de uma vez
├── content/
│   ├── blog/             # Artigos (.md) → /blog/<arquivo>
│   ├── areas/            # Áreas de atuação → /<arquivo>  (ex.: /direito-trabalhista)
│   ├── servicos/         # Serviços → /<area>/<arquivo>    (ex.: /direito-previdenciario/bpc-loas)
│   ├── paginas/          # Sobre e Política de Privacidade
│   └── index.js          # Catálogo de conteúdo e rotas
├── seo/                  # <head> por página (head.js) e dados estruturados (schema.js)
├── pages/                # Páginas (Home, Blog, Artigo, Área/Serviço, Sobre, Contato, 404…)
├── components/           # Componentes visuais
├── entry-server.jsx      # Usado só no build para gerar o HTML
└── main.jsx              # Entrada no navegador
scripts/
├── content-plugin.js     # Converte os .md em módulos (HTML pronto)
├── prerender.js          # Gera o HTML de cada página, 404, sitemap e imagens de compartilhamento
├── og-images.js          # Layout das imagens de compartilhamento
└── optimize-images.js    # Gera as versões WebP das imagens (npm run images)
```

---

## 📰 Publicar um artigo novo

1. Crie `src/content/blog/<slug-curto-sem-acento>.md` com o frontmatter:

   ```yaml
   ---
   title: "Título do artigo"
   date: 2026-11-20T10:00:00.000Z
   updated: 2026-11-20
   category: "direito-trabalhista"   # direito-trabalhista | direito-previdenciario | direito-civil | direito-de-familia
   excerpt: "Resumo de 1-2 frases para o card do blog."
   description: "Meta description de 140-155 caracteres."
   thumbnail: ""
   ---
   ```

2. Escreva o texto em Markdown, com seções `##` (sem `#` no corpo).
3. Rode `npm run build` e depois `npm run deploy`.

O artigo entra sozinho no blog, na página da área, nos "Leia também", no sitemap e ganha a imagem de compartilhamento. Há pautas prontas em [CALENDARIO-EDITORIAL.md](CALENDARIO-EDITORIAL.md).

**Atenção:** o nome do arquivo vira a URL. Depois de publicado, não renomeie, ou o Google perde a página.

---

## ⚙️ Rodar localmente

**Pré-requisitos:** Node.js 20+ e npm.

```bash
npm install
npm run dev       # desenvolvimento (http://localhost:5173)
npm run build     # build completo: site + HTML de cada página + sitemap + imagens
npm run lint
```

---

## 🚀 Deploy

```bash
npm run deploy    # build + publicação no Firebase Hosting (projeto alicesite-305bc)
```

Para testar antes, sem afetar o site no ar:

```bash
npm run build
firebase hosting:channel:deploy preview --expires 7d
```

Documentos de apoio:

- [MIGRACAO-DNS-FIREBASE.md](MIGRACAO-DNS-FIREBASE.md): troca do domínio do GitHub Pages para o Firebase.
- [PLANO-MELHORIAS-SITE.md](PLANO-MELHORIAS-SITE.md): plano completo de SEO e desempenho.
- [PRESENCA-LOCAL.md](PRESENCA-LOCAL.md): Perfil no Google, diretórios e avaliações.
- [REVISAO-JURIDICA.md](REVISAO-JURIDICA.md): pontos para a Dra. Alice revisar antes de publicar.

---

## 📄 Licença

Projeto de uso **privado e exclusivo** da Dra. Alice Gabriela Camargo. Todos os direitos reservados.
