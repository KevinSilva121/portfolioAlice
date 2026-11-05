# Troca do domínio: GitHub Pages → Firebase Hosting

Passo a passo para apontar **advalicecamargo.com.br** para o Firebase sem tirar o site do ar e sem prejudicar o Google.

## Situação em 05/11/2026

| Item | Estado |
|---|---|
| Projeto Firebase | `alicesite-305bc` (conta `kevinminimoto2@gmail.com`) |
| Site no Firebase | No ar e testado em https://alicesite-305bc.web.app |
| Domínio advalicecamargo.com.br | **Ainda servido pelo GitHub Pages** |
| Onde fica o DNS | **Registro.br** (servidores `d.sec.dns.br` e `e.sec.dns.br`) |

Enquanto o DNS não for trocado, **`npm run deploy` atualiza só o Firebase** (`alicesite-305bc.web.app`). Quem acessa advalicecamargo.com.br continua vendo a versão do GitHub. Para atualizar o GitHub nesse meio-tempo, use `npm run deploy:ghpages`.

## HTTPS: o que acontece na troca

- **O Firebase emite e renova o certificado SSL sozinho**, de graça. Não é preciso comprar nem instalar nada.
- **http → https é automático**, com redirect 301 (testado em `alicesite-305bc.web.app`). O comportamento é igual ao do GitHub hoje.
- **O GitHub manda hoje o cabeçalho HSTS** (`Strict-Transport-Security`, validade de 1 ano). Quem já visitou o site tem isso guardado no navegador. Durante esse ano, se o domínio aparecer com certificado inválido, **o navegador bloqueia a página e não deixa "continuar assim mesmo"**.
- Por isso a **configuração avançada é obrigatória**: nela o certificado do Firebase é emitido **antes** de o tráfego ir para lá, então não existe nenhum momento com certificado inválido. Com a configuração rápida, o certificado só seria emitido **depois** da troca, e visitantes recorrentes ficariam bloqueados por horas.
- O Firebase também manda HSTS (`max-age` de 1 ano, `includeSubDomains`, `preload`). Na prática, **qualquer subdomínio futuro** (ex.: `blog.advalicecamargo.com.br`) precisa ter HTTPS.

## Registros DNS atuais — anote antes de mexer

Esta tabela é o seu **plano de volta**. Para desfazer a troca, basta deixar a zona DNS exatamente assim de novo.

| Nome | Tipo | Valor |
|---|---|---|
| `@` (advalicecamargo.com.br) | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `kevinsilva121.github.io` |

Hoje não há registros AAAA, TXT nem CAA no domínio.

---

## Antes de começar

- [ ] Rodar `npm run deploy` com a versão mais recente do site e abrir https://alicesite-305bc.web.app para conferir.
- [ ] Ter acesso ao **Registro.br** e ao **console do Firebase** com a conta `kevinminimoto2@gmail.com`.
- [ ] **Não fazer a troca no mesmo dia de uma mudança grande no site.** Se o ranking oscilar, você precisa saber se foi a troca ou o conteúdo.
- [ ] Reservar um dia em que dê para voltar e conferir algumas horas depois. A troca em si leva minutos, mas a verificação do Firebase pode levar horas.

---

## Passo 1 — Adicionar o domínio no Firebase (configuração avançada)

1. Abra https://console.firebase.google.com/project/alicesite-305bc/hosting/sites
2. Clique em **Adicionar domínio personalizado**.
3. Digite `advalicecamargo.com.br`, **sem** www.
4. Escolha a **configuração avançada** (*Advanced setup*), **não** a rápida.

A configuração avançada existe justamente para domínios que já estão no ar em outro lugar. Com ela, o Firebase emite o certificado SSL (o cadeado do https) **antes** de o tráfego ir para lá. O site continua no GitHub até o final do processo.

## Passo 2 — Adicionar os registros TXT no Registro.br

O assistente do Firebase vai mostrar dois registros. Copie os valores **exatamente** como aparecem lá:

| Para quê | Tipo | Nome | Valor |
|---|---|---|---|
| Provar que o domínio é seu | TXT | `@` (o próprio domínio) | `hosting-site=alicesite-305bc` (confira no assistente) |
| Emitir o certificado SSL (desafio ACME) | TXT | o que o assistente indicar, normalmente `_acme-challenge` | o valor que o assistente mostrar |

No Registro.br: entre no domínio → **DNS** → edição da zona → **adicione** os dois TXT → salve.

> ⚠️ **Não apague nem altere os registros A do GitHub neste passo.** Por enquanto você só **adiciona** os TXT.

Se o assistente também pedir registros **CAA**, adicione. Isso só acontece quando já existem CAA bloqueando a emissão do certificado, e hoje o domínio não tem nenhum.

## Passo 3 — Esperar a verificação e o certificado

- No assistente, clique em **Verificar**. Se ainda não passar, espere e tente de novo.
- A propagação dos TXT pode levar de minutos até 24 horas. Em geral leva poucas horas.
- Só siga para o passo 4 quando o Firebase mostrar que **verificou a propriedade e preparou o certificado**.

Para conferir se os TXT já estão publicados, rode no PowerShell:

```powershell
Resolve-DnsName advalicecamargo.com.br -Type TXT
Resolve-DnsName _acme-challenge.advalicecamargo.com.br -Type TXT
```

## Passo 4 — Trocar os registros A (a troca de verdade)

O assistente vai mostrar os registros que apontam o domínio para o Firebase. Hoje a documentação indica A `199.36.158.100`, mas **use o que o assistente mostrar**, porque ele é a fonte oficial. Pode haver AAAA também.

No Registro.br, na mesma edição de zona:

1. **Apague os 4 registros A do GitHub** (`185.199.108.153`, `.109.153`, `.110.153` e `.111.153`).
2. **Adicione** o(s) registro(s) A (e AAAA, se pedir) que o Firebase mostrou.
3. Salve.

> ⚠️ **Não deixe registros do GitHub e do Firebase misturados.** Com os dois ao mesmo tempo, parte dos visitantes cai em cada lugar e o Firebase não consegue manter o certificado.

Depois disso, o status no console do Firebase muda para **Conectado** (*Connected*). Pode levar até cerca de uma hora para todo mundo ver o Firebase, porque o DNS antigo fica guardado em cache por esse tempo. Durante esse período o site **não sai do ar**: quem ainda está no cache antigo vê o GitHub, e quem já atualizou vê o Firebase. O conteúdo é o mesmo nos dois.

## Passo 5 — Fazer o mesmo para o www

Hoje `www.advalicecamargo.com.br` redireciona para o domínio sem www. O Firebase precisa continuar fazendo isso.

1. No console do Firebase, **Adicionar domínio personalizado** → `www.advalicecamargo.com.br`.
2. Marque a opção de **redirecionar** para `advalicecamargo.com.br`.
3. No Registro.br, **apague o CNAME** `www → kevinsilva121.github.io` e **adicione** o registro que o Firebase mostrar para o `www`.
4. Se o assistente oferecer a configuração avançada para o www também, use.

Se o www for pela configuração rápida, `https://www...` fica sem certificado válido por minutos ou horas, até ele ser emitido. Por causa do HSTS (ver [HTTPS](#https-o-que-acontece-na-troca)), quem digitar `www` nesse período pode ver a página **bloqueada**, não só um aviso. Para reduzir o impacto:

- Faça este passo **logo depois** do passo 4, num horário de pouco movimento.
- **Isso não afeta o Google**, que indexa só o domínio sem www, e os links do site e do Google apontam para o domínio sem www.

## Passo 6 — Conferir

Rode no PowerShell:

```powershell
# 1) O DNS já aponta para o Firebase? NÃO deve aparecer nenhum 185.199.x.x
Resolve-DnsName advalicecamargo.com.br -Type A
Resolve-DnsName www.advalicecamargo.com.br

# 2) Quem está servindo o site?
#    Se aparecer "Server: GitHub.com", ainda é o GitHub (cache de DNS: espere e teste de novo).
#    No Firebase não aparece o cabeçalho "Server".
curl.exe -sI https://advalicecamargo.com.br/

# 3) As páginas que davam 404 no GitHub agora devem responder 200
curl.exe -s -o NUL -w "%{http_code}  /blog`n" https://advalicecamargo.com.br/blog
curl.exe -s -o NUL -w "%{http_code}  artigo`n" https://advalicecamargo.com.br/blog/guarda-compartilhada
curl.exe -s -o NUL -w "%{http_code}  sitemap`n" https://advalicecamargo.com.br/sitemap.xml
curl.exe -s -o NUL -w "%{http_code}  robots`n" https://advalicecamargo.com.br/robots.txt

# 4) www e http devem redirecionar (301) para https://advalicecamargo.com.br/
curl.exe -s -o NUL -w "%{http_code} -> %{redirect_url}`n" https://www.advalicecamargo.com.br/
curl.exe -s -o NUL -w "%{http_code} -> %{redirect_url}`n" http://advalicecamargo.com.br/
```

Resultado esperado:

| Teste | Esperado |
|---|---|
| DNS | Só os IPs do Firebase, nenhum `185.199.x.x` |
| `curl -sI` na home | **Sem** `Server: GitHub.com` |
| `/blog`, artigo, sitemap, robots | `200` |
| www e http | `301 -> https://advalicecamargo.com.br/` |

Abra também o site no navegador, em uma aba anônima, e confira o cadeado do https.

## Passo 7 — Google Search Console

Faça no mesmo dia em que o passo 6 passar:

1. Confirme que a propriedade continua **verificada**. O arquivo de verificação agora é publicado em `https://advalicecamargo.com.br/googlefeff92f307e5f64e.html`; no GitHub ele dava 404.
2. **Sitemaps** → envie `https://advalicecamargo.com.br/sitemap.xml`.
3. **Inspeção de URL** → teste `https://advalicecamargo.com.br/blog` → **Testar URL publicada** → **Solicitar indexação**. Repita para cada artigo.
4. Recomendado: adicione também uma propriedade do tipo **Domínio** (verificada por TXT no Registro.br). Ela cobre www, http e https juntos e não depende da hospedagem.

**Não use** a ferramenta "Mudança de endereço". Ela serve para quem troca de domínio, e aqui o domínio continua o mesmo.

Nas semanas seguintes, acompanhe o relatório **Páginas** (indexação). As páginas do blog devem passar de "Não encontrado (404)" para "Indexada".

## Passo 8 — Desligar o GitHub Pages (1 a 2 semanas depois)

Só quando o passo 6 estiver passando há dias e o Search Console estiver normal:

1. No GitHub: repositório `portfolioAlice` → **Settings** → **Pages** → remova o domínio personalizado e desative o Pages.
2. Opcional: apague os arquivos `public/CNAME` e `public/404.html` e o script `deploy:ghpages` do `package.json`. Eles só servem para o GitHub Pages.

> ⚠️ **Nunca desative o GitHub Pages enquanto algum registro do DNS ainda apontar para o GitHub** (`185.199.x.x` ou `kevinsilva121.github.io`). Um domínio apontando para o GitHub sem site configurado pode ser assumido por outra pessoa.

---

## Se algo der errado: como voltar

1. No Registro.br, apague os registros do Firebase (A/AAAA do `@` e o registro do `www`).
2. Recoloque **exatamente** a tabela de [Registros DNS atuais](#registros-dns-atuais--anote-antes-de-mexer) (os 4 A do GitHub e o CNAME do www).
3. Em até cerca de uma hora, todo mundo volta a ver o GitHub Pages. A branch `gh-pages` não foi alterada.

Os TXT do Firebase podem ficar; eles não atrapalham nada.

## Problemas comuns

| Sintoma no console do Firebase | O que fazer |
|---|---|
| **Needs setup** | O DNS ainda não propagou ou o token do desafio SSL expirou. Clique em **Ver** no domínio para gerar um token novo e atualize o TXT `_acme-challenge` no Registro.br. |
| **Pending** por muitas horas | Confira se não sobrou registro A, AAAA ou CNAME do GitHub. Se existir CAA, ele precisa permitir `letsencrypt.org` e `pki.goog`. |
| Erro de certificado / navegador bloqueia a página | O certificado ainda não foi emitido. Por causa do HSTS, quem já visitou o site é bloqueado, não só avisado. Na configuração avançada isso não deveria acontecer, porque o certificado sai antes do passo 4. Se acontecer no domínio principal e não resolver em cerca de uma hora, **volte os registros do GitHub** (seção abaixo) e espere o Firebase mostrar o certificado pronto antes de tentar de novo. |
| `curl -sI` ainda mostra `Server: GitHub.com` | Cache de DNS. Espere cerca de uma hora e teste de novo. No Windows, `ipconfig /flushdns` limpa o cache local. |

## Referência

- Documentação oficial: https://firebase.google.com/docs/hosting/custom-domain
- Configuração da hospedagem: [firebase.json](firebase.json) (rotas, redirect de barra final e cache) e [.firebaserc](.firebaserc) (projeto).
