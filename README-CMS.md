# 📖 Guia de Configuração do Blog (Decap CMS)

Foi implementado no site da Dra. Alice o **Decap CMS**, um sistema moderno e gratuito onde ela poderá escrever postagens no Blog diretamente pelo celular ou computador, sem precisar acessar código, e que subirá no GitHub Pages automaticamente.

Como o GitHub não permite autenticação direta da tela do CMS para o repositório por questões de segurança (sem um servidor intermediário), a forma **mais rápida e 100% gratuita** de contornar isso para Sites Estáticos é vinculando o site ao **Netlify** apenas para cuidar do Login. Fique tranquilo, o site continuará hospedado no GitHub Pages.

## Passo a Passo para Liberar o Acesso da Dra Alice:

1. **Crie uma conta no Netlify:**
   - Acesse [netlify.com](https://www.netlify.com/) e faça login usando a mesma conta do GitHub onde o repositório `portfolioAlice` está.

2. **Crie um "Site Fantasma" apenas para o Login:**
   - No painel, clique em "Add new site" > "Import an existing project".
   - Escolha o GitHub e autorize-o a ver o repositório `portfolioAlice`.
   - Clique no final em "Deploy Site".
   - O Netlify vai gerar um link estranho como `https://jade-dragon-1234.netlify.app`. Copie este link!

3. **Configure este Link no seu código (`config.yml`):**
   - Volte no seu VSCode ou GitHub, abra o arquivo `public/admin/config.yml`.
   - Na linha `4`, encontre o `# base_url: https://seusite-auth.netlify.app`.
   - Remova o `#` (para descomentar).
   - Substitua o link pelo link gerado no passo 2. Vai ficar assim:
   `base_url: https://jade-dragon-1234.netlify.app`
   
4. **Ative o Identity (Login) no Netlify:**
   - No painel do Netlify do seu site, vá na barra superior e clique em **"Site configuration"** (ou "Identity").
   - Procure por **Identity** no menu lateral e clique em **"Enable Identity"**.

5. **Libere o Acesso ao Repositório (OAuth):**
   - Ainda no menu Identity (ou Settings > Identity), desça até a seção **"Services"** ou **"External Providers"**.
   - No bloco **GitHub**, clique em "Enable". É isso que autoriza o Netlify a ser a ponte para o GitHub Pages.
   - Mais para baixo, em **Registration preferences**, marque como **"Invite only"** (para que pessoas aleatórias da internet não possam criar contas no Blog dela).

6. **Convide a Dra. Alice!**
   - Na própria aba de Identity do Netlify, suba e clique em **"Invite users"**.
   - Coloque o e-mail oficial da Dra. Alice. Ela receberá um e-mail com um link para criar uma senha.
   - Assim que ela aceitar e criar a senha, diga para ela acessar pelo celular dela o endereço:
   👉 **`https://kevinsilva121.github.io/portfolioAlice/admin/`**

Pronto! Ao acessar essa URL (o `/admin/` no final do site oficial), ela verá uma tela de login moderna. Ali ela entra com o e-mail e a senha que acabou de cadastrar, e visualizará um painel administrativo perfeito para redigir artigos, subir imagens e publicar! Tudo que ela criar lá se transformará num commit no Github dela sozinho e o site atualizará as rotas do Blog após 2 minutinhos.
