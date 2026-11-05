# Plano de melhorias: advalicecamargo.com.br

**Objetivo:** um site rápido, completo e que traga clientes pela busca orgânica do Google, principalmente quem procura advogada em **Taubaté e região**.

**Legenda.** Quem faz: **Código** é trabalho de desenvolvimento; **Alice** é texto, aprovação ou informação dela; **Contas** é cadastro ou configuração em serviços externos. Esforço: **P** = horas, **M** = 1–2 dias, **G** = vários dias.

---

## 1. Diagnóstico (05/11/2026)

### Medição do Google (Lighthouse, celular)

| Página | Desempenho | SEO | Acessibilidade | Boas práticas | Conteúdo principal aparece em |
|---|---|---|---|---|---|
| Home | **52** | 85 | 87 | 100 | **7,0 s** |
| /blog | 84 | 100 | 88 | 100 | 3,4 s |
| Artigo | 89 | 100 | 86 | 100 | 2,4 s |

Referência do Google: **conteúdo principal (LCP) em menos de 2,5 s**. A home pesa **1,9 MB**, e o Lighthouse estima **1,4 MB de economia só nas imagens** e **1,8 s** perdidos com CSS e fontes que bloqueiam a exibição.

### O que está faltando ou atrapalhando

| Área | Situação hoje |
|---|---|
| Indexação | Só a home é indexada: no GitHub Pages as outras páginas respondem 404. **Resolvido na migração** (falta trocar o DNS). |
| HTML | O HTML chega vazio (`<div id="root">`) e tudo depende de JavaScript. O Google lê com atraso. WhatsApp, LinkedIn e Facebook **não** executam JavaScript, então um link compartilhado aparece sem título próprio e sem imagem. |
| Peso | JavaScript de 720 KB num arquivo só. `alice.png` tem 776 KB, `bg-law.png` 612 KB e os ícones 27–72 KB cada. |
| Topo da página | O título e os textos do topo começam invisíveis (animação) e só aparecem depois do JavaScript, o que atrasa o carregamento. |
| Conteúdo | 6 artigos com **96 a 249 palavras**, curtos para tema jurídico. Último artigo em março/2026. Sem autora, sem imagem, quase sem links internos. |
| Estrutura | As 4 áreas de atuação são só cards na home. **Concorrentes locais têm uma página por área e cidade** (ex.: "advogado trabalhista Taubaté SP"). |
| SEO local | "Taubaté" aparece só no Sobre e no rodapé. O título e o H1 da home não dizem o que ela é nem onde atende. Não há Perfil da Empresa no Google conhecido. |
| Presença externa | Numa busca pelo nome, a Alice não aparece. Os resultados locais são dominados por diretórios: Jusbrasil, Previdenciarista, Jurídico Certo, Escavador. |
| Dados estruturados | Nenhum. O Google não "entende" que o site é de uma advogada, com OAB, cidade e áreas. |
| Meta tags | Home sem descrição. Nenhuma página com tags de compartilhamento (Open Graph). |
| Medição | Nenhum analytics. Não há como saber quantos contatos vêm do site. |
| LGPD | O formulário coleta nome, e-mail e telefone **sem política de privacidade**. |
| Rastreamento | Fora da home, os itens do menu são `<span>`, que o Google não segue (Lighthouse: "Links are not crawlable"). Uma URL inexistente (`/xyz`) mostra página vazia com status 200. |
| Acessibilidade | Botão do menu sem nome, contraste insuficiente em alguns textos, ordem de títulos pulando níveis, cursor customizado e animações sem respeitar quem prefere menos movimento. |
| Segurança | 14 vulnerabilidades em dependências. Duas vão para o navegador (`react-router` e `js-yaml`). |

---

## 2. Fase 0: concluir a migração (pausada)

Passo a passo em [MIGRACAO-DNS-FIREBASE.md](MIGRACAO-DNS-FIREBASE.md). O certificado já está pronto no Firebase; falta trocar os registros A.

As fases 1 e 2 podem ser **desenvolvidas** antes, mas só devem ser **publicadas** depois que a migração estiver estável há alguns dias (ver ordem na seção 11).

---

## 3. Fase 1: fundação técnica de SEO

| # | O quê | Por quê | Quem | Esforço |
|---|---|---|---|---|
| 1.1 | **Gerar o HTML de cada página já pronto no build** (pré-renderização) | O Google lê tudo na hora, sem depender de JavaScript. As prévias de link no WhatsApp e no LinkedIn passam a funcionar. O carregamento fica mais rápido. | Código | G |
| 1.2 | **404 de verdade**: página "não encontrada" com status 404 e links úteis | Hoje uma URL inexistente dá 200 com página vazia, o que o Google trata como página de baixa qualidade. Com o 1.1, o Firebase passa a devolver 404 real. | Código | P |
| 1.3 | **Meta tags completas por página**: título, descrição, canônica, Open Graph (`og:title`, `og:description`, `og:image`, `og:locale=pt_BR`) e Twitter Card | Controla como cada página aparece no Google e em redes e mensageiros. | Código | P |
| 1.4 | **Imagem de compartilhamento** 1200×630: uma padrão e uma por artigo | Sem ela, o link compartilhado aparece sem imagem. | Código + Alice (foto/arte) | P |
| 1.5 | **Dados estruturados (JSON-LD)**: `LegalService` + `Person` na home (nome, OAB, telefone, e-mail, Taubaté, áreas, LinkedIn); `BlogPosting` nos artigos (autora, datas, imagem); `BreadcrumbList` nas páginas internas | Ajuda o Google a entender quem é, onde atua e quem escreve. Reforça autoria em tema jurídico. | Código | M |
| 1.6 | **Links rastreáveis**: menu com `<a href>` de verdade em todas as páginas | O Google não segue `<span onClick>`. | Código | P |
| 1.7 | **Hierarquia de títulos**: um H1 por página, sem pular níveis (o rodapé usa H2 para o logo; os artigos pulam de H1 para H3) | Estrutura clara para o Google e para leitores de tela. | Código | P |
| 1.8 | **Breadcrumb visível** nos artigos (Início › Blog › Artigo) | Navegação e trilha no resultado do Google. | Código | P |
| 1.9 | **Sitemap**: incluir as páginas novas automaticamente, com `lastmod` e imagens | Já é gerado no build; só falta ampliar. | Código | P |
| 1.10 | **Limpeza pós-migração**: remover o truque `?p=` do `index.html`, `public/404.html`, `public/CNAME` e o script `deploy:ghpages` | Só depois de desligar o GitHub Pages. | Código | P |

> Sobre FAQ: o Google deixou de mostrar o destaque de "perguntas frequentes" nos resultados para a maioria dos sites em 2023. Marcar o FAQ com dados estruturados é opcional e tem pouco retorno.

---

## 4. Fase 2: desempenho (Core Web Vitals)

**Metas (celular):** Lighthouse Desempenho ≥ 90; conteúdo principal (LCP) < 2,5 s; estabilidade (CLS) < 0,1; resposta a cliques (INP) < 200 ms.

| # | O quê | Ganho esperado | Quem | Esforço |
|---|---|---|---|---|
| 2.1 | **Imagens em WebP/AVIF no tamanho certo**: foto da Alice, fundo do topo e ícones dos links úteis. Com `width`/`height` e versões para celular (`srcset`). | Cerca de 1,4 MB a menos na home (de 1,9 MB para ~0,4 MB). | Código | P |
| 2.2 | **Topo da página visível de imediato**: sem animação que esconde o título e o botão; pré-carregar a imagem de fundo | É o maior responsável pelos 7 s da home. | Código | P |
| 2.3 | **Fontes no próprio site** (Inter e Playfair, woff2, só caracteres latinos), em vez de `@import` do Google Fonts | Elimina a cadeia que bloqueia a exibição (~1,8 s estimados). | Código | P |
| 2.4 | **Ler os artigos `.md` no build**, não no navegador | Tira o `js-yaml` e o polyfill de `buffer` do JavaScript enviado. | Código | P |
| 2.5 | **Dividir o JavaScript**: blog e leitor de Markdown só carregam quando abrir o blog | A home baixa e executa menos código. | Código | M |
| 2.6 | **Animações mais leves**: trocar `framer-motion` por CSS onde der, reduzir as 25 partículas, respeitar `prefers-reduced-motion`, cursor customizado só onde há mouse (ou remover) | Hoje são 590 ms de travamento na home (TBT); pesa no celular e na bateria. | Código | M |
| 2.7 | **Cache das imagens**: passar as imagens pelo build (nome com hash) para cache de 1 ano, igual aos arquivos de `/assets` | Visitas seguintes quase instantâneas. | Código | P |

---

## 5. Fase 3: páginas novas e estrutura do site

| # | O quê | Por quê | Quem | Esforço |
|---|---|---|---|---|
| 3.1 | **Uma página por área de atuação**: Trabalhista, Previdenciário, Cível/Consumidor e Família. Cada uma com o que ela faz, situações comuns, documentos necessários, como funciona o processo, perguntas da área, artigos relacionados e contato. | É o que mais traz cliente pela busca ("advogada trabalhista Taubaté"). Os concorrentes locais já têm. | Código + **Alice (texto)** | G |
| 3.2 | **Páginas de serviços específicos** (depois do 3.1), por exemplo: aposentadoria negada pelo INSS, BPC/LOAS, auxílio-doença, rescisão indireta, divórcio extrajudicial, pensão alimentícia, inventário | Buscas específicas são menos disputadas e têm mais intenção de contratar. | Código + Alice | G (contínuo) |
| 3.3 | **Página "Sobre" própria** (`/sobre`): trajetória, formação (UNITAU), OAB com link para a consulta oficial, foto, como trabalha | Confiança e autoria, que o Google valoriza muito em tema jurídico. Vira a página da autora dos artigos. | Código + Alice | M |
| 3.4 | **Página "Contato" própria** (`/contato`): WhatsApp, telefone clicável, e-mail, formulário, cidade e área de atendimento | Página clara para quem já decidiu entrar em contato. | Código | P |
| 3.5 | **Política de Privacidade** (`/privacidade`): que dados o formulário coleta, para quê e quem processa (hoje o FormSubmit) | Exigência da LGPD e sinal de confiança. | Código + Alice (revisão) | P |
| 3.6 | **Página de "mensagem enviada"** (`/obrigado`), em vez da página do FormSubmit | Visitante continua no site e o contato pode ser medido como conversão. | Código | P |
| 3.7 | **Blog mais completo**: categoria por área, tempo de leitura, caixa da autora com OAB, artigos relacionados, sumário nos artigos longos | Mais páginas vistas por visita e mais links internos. | Código | M |
| 3.8 | **Menu e rodapé** com as áreas e as páginas novas | Links internos distribuem relevância para as páginas importantes. | Código | P |

**URLs são para sempre.** Antes de criar as páginas, precisamos fechar o formato. Sugestão: `/direito-trabalhista`, `/direito-previdenciario`, `/direito-do-consumidor`, `/direito-de-familia`, com "Taubaté" no título e no texto e não na URL, para não amarrar a URL a uma cidade.

**Páginas por cidade da região** (São José dos Campos, Pindamonhangaba, Tremembé, Caçapava): só com conteúdo realmente próprio para cada cidade. Páginas quase iguais trocando o nome da cidade são punidas pelo Google. Na dúvida, "Taubaté e região" mais "atendimento online" resolve.

---

## 6. Fase 4: conteúdo (o que mais traz visita orgânica)

| # | O quê | Quem | Esforço |
|---|---|---|---|
| 4.1 | **Ampliar os 6 artigos atuais** para 800–1.500 palavras, **mantendo as mesmas URLs**. Prioridade: `importancia-assessoria` (96 palavras) e `direitos-trabalhistas-home-office` (179). | Alice (eu formato e publico) | G |
| 4.2 | **Calendário fixo de 2 a 4 artigos por mês**, cada um respondendo **uma** dúvida que as pessoas digitam no Google | Alice | contínuo |
| 4.3 | **Padrão de cada artigo**: autora com OAB, data de publicação e de atualização, imagem com descrição (`alt`), lei ou súmula citada com link, link para a página da área e para um artigo relacionado, chamada para contato no fim | Código (modelo) + Alice | P |
| 4.4 | **Revisar o FAQ e as chamadas**: o dado "em mais de 40% dos casos o INSS nega…" não tem fonte (citar ou remover); suavizar chamadas mais apelativas. Seguir o [Provimento 205/2021 da OAB](https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021): conteúdo informativo, sem captação ou mercantilização. | Alice | P |
| 4.5 | **Correções pequenas**: link `http://` do planalto.gov.br para `https://`; trocar links "[Ícone do WhatsApp](/)" por links para a área ou o contato | Código | P |
| 4.6 | **Atualizar artigos antigos** a cada 6–12 meses (lei muda); a data de atualização aparece no Google | Alice | contínuo |

**Exemplos de temas** (dúvidas reais, por área; o volume de busca é confirmado depois pelo Search Console):

| Área | Ideias de artigo |
|---|---|
| Trabalhista | Demitido sem justa causa: o que receber · Rescisão indireta · Horas extras não pagas · Assédio moral: como provar · Acidente de trabalho e estabilidade · Insalubridade e periculosidade |
| Previdenciário | Aposentadoria negada: o que fazer · BPC/LOAS: quem tem direito · Auxílio-doença negado · Revisão da aposentadoria · Pensão por morte · Planejamento previdenciário |
| Família | Divórcio em cartório × judicial · Pensão alimentícia atrasada · Guarda compartilhada × alternada · União estável: direitos · Inventário: prazos e custos |
| Cível / Consumidor | Voo atrasado ou cancelado · Compra pela internet com defeito · Nome negativado indevidamente · Distrato de imóvel na planta · Cobrança indevida |

> Conteúdo jurídico é tratado pelo Google como tema sensível (afeta a vida e o dinheiro das pessoas) e exige autoria clara, fontes e revisão. **Não publicar texto gerado por IA sem revisão da Alice.**

---

## 7. Fase 5: presença local e fora do site (não depende de código; **pode começar já**)

| # | O quê | Por quê | Quem |
|---|---|---|---|
| 5.1 | **Perfil da Empresa no Google** (Google Business Profile): categoria "Advogado", área de atendimento Taubaté e região (dá para esconder o endereço se não houver escritório), telefone/WhatsApp, horário, link do site, fotos, lista de serviços, publicações periódicas | Em buscas como "advogada trabalhista Taubaté", o mapa aparece **acima** dos resultados comuns. É a maior alavanca local. | Alice + Contas |
| 5.2 | **Avaliações no Google** de clientes atendidos, pedidas sem oferecer nada em troca, e respondidas | É o principal fator de destaque no mapa. | Alice |
| 5.3 | **Mesmo nome, telefone e cidade em todo lugar** (site, Perfil no Google, redes, diretórios) | Consistência é sinal de confiança para o Google local. | Alice |
| 5.4 | **Perfis em diretórios que já aparecem no Google**: Jusbrasil (perfil verificado), Previdenciarista, Jurídico Certo, Escavador. Todos com link para o site. | Eles ocupam a primeira página hoje; estar neles é estar na primeira página. E cada perfil gera um link para o site. | Alice |
| 5.5 | **Redes sociais**: LinkedIn (já tem), Instagram (criar se não tiver), com link no rodapé do site | Divulgar os artigos e reforçar a autoridade. | Alice |
| 5.6 | **Links de outros sites**: entrevistas e artigos em portais de notícias de Taubaté, artigos no Jusbrasil e em portais jurídicos, parcerias com contadores e associações locais | Links de sites relevantes continuam entre os fatores mais fortes de ranking. **Nunca comprar links.** | Alice |
| 5.7 | **Bing Webmaster Tools** (importa tudo do Search Console em 2 cliques) | Grátis; o Bing também alimenta outros buscadores. | Contas |

---

## 8. Fase 6: conversão (transformar visita em contato)

| # | O quê | Quem | Esforço |
|---|---|---|---|
| 6.1 | **Mensagem de WhatsApp pré-preenchida por página** (já existe no FAQ; levar para áreas e artigos: "Li sobre aposentadoria negada…") | Código | P |
| 6.2 | **Telefone clicável** (`tel:`) no celular | Código | P |
| 6.3 | **Formulário**: validação, aceite da política de privacidade, redirecionar para `/obrigado`. Opcional: sair do FormSubmit para Firebase (dados ficam no seu projeto e chegam por e-mail). | Código | M |
| 6.4 | **Sinais de confiança perto dos botões**: OAB com link para a verificação oficial, como funciona a primeira conversa, prazo de resposta | Código + Alice | P |
| 6.5 | Depoimentos de clientes: **só depois de confirmar com a OAB/SP** o que é permitido | Alice | — |

---

## 9. Fase 7: medição (saber o que funciona)

| # | O quê | Quem | Esforço |
|---|---|---|---|
| 7.1 | **Search Console**: propriedade do tipo Domínio, sitemap enviado e acompanhamento mensal de cliques, impressões, posição e páginas indexadas | Contas | P |
| 7.2 | **Analytics**: Google Analytics 4 (integrado ao Firebase) **com aviso de cookies** (LGPD) ou uma alternativa sem cookies. **Decisão sua.** | Código + Contas | M |
| 7.3 | **Eventos de conversão**: clique no WhatsApp, envio do formulário, clique no telefone | Código | P |
| 7.4 | **Relatório mensal** (Looker Studio, grátis) juntando Search Console, Analytics e Perfil no Google | Contas | P |

---

## 10. Fase 8: acessibilidade, segurança e manutenção

| # | O quê | Quem | Esforço |
|---|---|---|---|
| 8.1 | **Acessibilidade**: nome nos botões (menu, LinkedIn), contraste dos textos, foco visível, `prefers-reduced-motion` | Código | P |
| 8.2 | **Atualizar dependências** e zerar as vulnerabilidades (`react-router` e `js-yaml` vão para o navegador) | Código | P |
| 8.3 | **Cabeçalhos de segurança** no `firebase.json`: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e, depois, CSP | Código | P |
| 8.4 | **Deploy automático** com GitHub Actions: merge na `main` publica no Firebase; cada PR ganha um **link de preview** para aprovar antes | Código | M |
| 8.5 | **Publicação de artigos sem programador** (opcional): editar o `.md` pelo GitHub com deploy automático, ou um painel simples (Decap CMS) | Código | M |
| 8.6 | **Limpeza**: remover `Trajectory.jsx` (não usado), `build_error.txt`, ícones duplicados (`tst.jpg`/`tst.png`) e atualizar o README (ainda fala em HashRouter, GitHub Pages e Decap CMS) | Código | P |

---

## 11. Ordem sugerida

| Quando | O quê |
|---|---|
| **Já** | Fase 5.1–5.4 (Perfil no Google e diretórios). Não depende do site e é o que dá resultado local mais rápido. |
| **Semana 0** | Concluir a migração (Fase 0) e acompanhar 5–7 dias no Search Console. |
| **Semanas 1–2** | Fases 1 e 2 (técnico e desempenho), testadas no link de preview e publicadas depois da migração estável. Junto: política de privacidade (3.5), página de obrigado (3.6), medição (Fase 7) e acessibilidade e segurança (8.1–8.3). |
| **Semanas 2–3** | Mudança de título e H1 da home com "Advogada em Taubaté". **Sozinha**, porque mexe no que já ranqueia; acompanhar 2–4 semanas. |
| **Semanas 3–6** | Páginas das 4 áreas (3.1), Sobre e Contato (3.3, 3.4), ampliação dos 6 artigos (4.1). |
| **Contínuo** | 2–4 artigos por mês, avaliações no Google, páginas de serviços específicos (3.2), relatório mensal. |

**Regra geral:** uma mudança grande por vez, sempre medindo. Assim, se algo subir ou cair, dá para saber a causa.

---

## 12. Metas

São metas sugeridas para acompanhar o progresso, não previsões garantidas.

| Indicador | Hoje | 3 meses | 6 meses |
|---|---|---|---|
| Páginas indexadas no Google | 1 | todas as publicadas (~20) | ~40 |
| Lighthouse Desempenho (home, celular) | 52 | ≥ 90 | ≥ 90 |
| Lighthouse SEO / Acessibilidade | 85 / 87 | 100 / ≥ 95 | 100 / ≥ 95 |
| Cliques orgânicos por mês (Search Console) | medir no mês da migração | +100% sobre a base | +300% sobre a base |
| Contatos pelo site por mês (WhatsApp + formulário) | sem medição | medido | crescendo mês a mês |
| Posição para "advogada trabalhista Taubaté" e similares | medir no Search Console | top 20 | top 10 / mapa |

As metas de tráfego dependem principalmente do ritmo de conteúdo (Fase 4) e do Perfil no Google (Fase 5). O código (Fases 1, 2 e 8) tira os bloqueios, mas sozinho não traz visita.

---

## 13. Decisões que precisam de você ou da Alice

1. **Endereço:** há escritório para receber clientes ou só atendimento na região e online? Muda o Perfil no Google e os dados estruturados.
2. **Formato das URLs** das páginas de área (sugestão na seção 5).
3. **Analytics:** GA4 com aviso de cookies ou uma alternativa sem cookies.
4. **Título e H1 da home:** aprovar o texto novo (ex.: "Advogada em Taubaté/SP: Trabalhista, Previdenciário, Família e Cível").
5. **Redes:** quais perfis existem (Instagram, Jusbrasil…) para linkar no site.
6. **Conteúdo:** quem escreve e quem revisa, e qual ritmo é realista.
7. **Formulário:** continuar no FormSubmit ou trazer para o Firebase.
8. **Foto e imagens:** fotos profissionais da Alice e imagens para os artigos (próprias ou de banco licenciado).

## O que **não** fazer

- **Mudar URLs que já existem.** Se for inevitável, sempre com redirect 301.
- **Criar páginas quase iguais por cidade.**
- **Comprar links** ou avaliações.
- **Publicar texto jurídico sem revisão da Alice.**
- **Mexer em tudo ao mesmo tempo.**
