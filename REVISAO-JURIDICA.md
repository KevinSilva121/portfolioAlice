# Revisão jurídica antes de publicar

Os textos novos do site foram redigidos com base na legislação e em fontes públicas. Mas conteúdo jurídico com o nome da Dra. Alice **precisa da revisão dela antes de ir ao ar**. Esta lista reúne os pontos que dependem de entendimento dos tribunais, de normas recentes ou que não puderam ser conferidos no texto oficial.

**Como revisar:** abra cada página no link de preview (sem afetar o site no ar), leia e marque o que estiver ok. Correções podem ser feitas direto no arquivo `.md` indicado ou enviadas para quem cuida do site.

Preview: https://alicesite-305bc--melhorias-site-c8hiap8l.web.app (expira em 05/12/2026)

---

## Páginas novas

| Página | Arquivo |
|---|---|
| Direito do Trabalho | `src/content/areas/direito-trabalhista.md` |
| Direito Previdenciário | `src/content/areas/direito-previdenciario.md` |
| Direito Cível | `src/content/areas/direito-civil.md` |
| Direito de Família | `src/content/areas/direito-de-familia.md` |
| Rescisão indireta | `src/content/servicos/rescisao-indireta.md` |
| Aposentadoria negada pelo INSS | `src/content/servicos/aposentadoria-negada-inss.md` |
| BPC/LOAS | `src/content/servicos/bpc-loas.md` |
| Auxílio-doença | `src/content/servicos/auxilio-doenca.md` |
| Divórcio | `src/content/servicos/divorcio.md` |
| Pensão alimentícia | `src/content/servicos/pensao-alimenticia.md` |
| Inventário | `src/content/servicos/inventario.md` |
| Sobre | `src/content/paginas/sobre.md` |
| Política de Privacidade (LGPD) | `src/content/paginas/privacidade.md` |

Os 6 artigos do blog foram **reescritos e ampliados** (`src/content/blog/`). A cópia dos textos originais ficou guardada fora do projeto. Na reescrita foram **corrigidos erros dos textos antigos**:

- **Distrato:** os percentuais estavam errados. Pela Lei 13.786/2018, a multa é de até 25% sem patrimônio de afetação e de até 50% com ele.
- **Tempo especial:** a conversão vale para períodos até 13/11/2019, e não "antes de 1995".
- **Voo:** o texto antigo dava a indenização como certa. O texto novo segue o art. 251-A do CBA e o STJ (REsp 1.584.465/MG): o dano moral precisa ser demonstrado.
- **Frases removidas:** promessas ("indenização garantida", "certeza matemática"), urgência apelativa e um dado sem fonte ("retêm 60%").

## FAQ da home (texto original da Dra. Alice, ajustado)

Arquivo `src/components/FAQ.jsx`. Foram feitas só correções por causa das regras da OAB:

1. **Aposentadoria negada:**
   - "Em mais de 40% dos casos o INSS nega…" virou "Muitas vezes o INSS nega…" (estatística sem fonte);
   - "pode zerar todo o tempo de espera dos meses em atraso" virou "pode fazer você perder os valores atrasados desde o primeiro pedido".
2. **Acidente de trabalho:** "Acione nosso WhatsApp agora para elaborarmos sua proteção patrimonial…" virou "Se quiser, fale pelo WhatsApp para entendermos a sua situação com calma…" (apelo de urgência).
3. **Assédio moral:** "tem ampla chance de indenização" virou "podem levar ao reconhecimento do direito à indenização…, conforme as provas de cada caso" (insinuação de resultado).
4. **Produto com defeito:** "contata-se 90 dias com o fabricante" virou "o prazo para reclamar é de 90 dias (art. 26 do CDC)".

---

## Pontos para conferir

### Normas de 2026 citadas a partir de fontes secundárias

Estas normas foram citadas sem ler o texto oficial. Conferir no Diário Oficial ou no site do órgão.

- [ ] **Jornada de trabalho:** a **EC 141/2026** (DOU de 16/10/2026) foi **confirmada no Planalto**. A página trabalhista fala dela de forma genérica. O artigo de horas extras cita os números (42h e depois 40h semanais) com link; ver os detalhes na seção "Artigos novos".
- [ ] **ANAC, Resolução 813/2026**, que alterou a Resolução 400/2016 (publicada em 25/09/2026, em vigor desde 26/10/2026). O artigo de voo usa:
  - fim da facilidade de comunicação após 1h;
  - reembolso de gastos do passageiro em até 7 dias (art. 27-B);
  - assistência não significa reconhecer culpa (art. 26, parágrafo único).
- [ ] **NR-1 (riscos psicossociais):** o artigo de assessoria preventiva cita a norma sem data. As fontes indicam vigência desde 26/05/2026.

### Trabalhista

- [ ] Rescisão indireta por falta ou irregularidade de FGTS: tese do TST de 2025 (Tema 70 dos repetitivos), que dispensa a imediatidade. Conferida por fontes secundárias, não pelo acórdão.
- [ ] Nas demais hipóteses de rescisão indireta: imediatidade, gravação feita por quem participa da conversa e conversão em pedido de demissão, todas apresentadas como "entendimento dos tribunais".
- [ ] Base de cálculo da insalubridade: dita como "ainda gera discussão" (Súmula Vinculante 4).
- [ ] Não acumulação de insalubridade com periculosidade: "entendimento que prevalece no TST".
- [ ] Estabilidade acidentária: exceção da Súmula 378 do TST resumida.
- [ ] Responsabilidade objetiva em atividade de risco (STF, Tema 932): "os tribunais podem reconhecer".
- [ ] Projeção do aviso prévio e início da prescrição (OJ 83 da SDI-1).
- [ ] Pejotização (STF, Tema 1.389): andamento incerto em 2026.
- [ ] Home office: reembolso de despesas quando o contrato é omisso e vale-transporte no modelo híbrido, ditos como "depende do caso".

### Previdenciário

- [ ] Prazo de 30 dias para recurso ao CRPS (art. 305 do Decreto 3.048/1999): o texto do artigo não pôde ser aberto para conferir.
- [ ] Prorrogação do auxílio-doença nos 15 dias antes da cessação: regra de norma interna do INSS, não conferida.
- [ ] BPC:
  - flexibilização do critério de 1/4 do salário mínimo (art. 20, §§ 11 e 11-A; STF Tema 27);
  - biometria (Lei 14.973/2024);
  - CadÚnico (Lei 15.077/2024);
  - reavaliação médica (Lei 15.157/2025);
  - art. 20, § 14;
  - "BPC não gera pensão" (Decreto 6.214/2007).
- [ ] Pensão por morte: cotas de 50% + 10% por dependente (art. 23 da EC 103/2019), "com exceções".
- [ ] Revisão: prazo de 10 anos limitado ao ato de concessão (ADI 6096).
- [ ] Novo pedido e data de início do benefício: escrito de forma genérica.
- [ ] Competência: ações acidentárias na Justiça Estadual e as demais, "em geral", na Federal.
- [ ] Planejamento previdenciário:
  - restrição das contribuições de 11% e 5% (MEI) para aposentadoria por tempo de contribuição (art. 21 da Lei 8.212);
  - fatores de conversão do tempo especial (40% para homens, 20% para mulheres, na atividade de 25 anos).

### Cível

- [ ] Devolução em dobro: mudança de entendimento do STJ (EAREsp 676.608) e modulação temporal.
- [ ] Prescrição: 3 anos (reparação civil) e 5 anos (art. 27 do CDC). Para contratos, só "o prazo pode ser outro".
- [ ] Voo internacional: Convenção de Montreal (STF, Temas 210 e 1.240) e prazo próprio. Manutenção da aeronave tratada como risco da atividade.
- [ ] Distrato:
  - como a Súmula 543 convive com os prazos da Lei 13.786;
  - redução judicial da multa de 50% (CDC e art. 413 do CC);
  - a lei não se aplicar a contratos anteriores a 28/12/2018.

### Família

- [ ] Resolução CNJ 571/2024:
  - divórcio em cartório com filhos menores, se guarda, convivência e pensão já foram resolvidas em juízo;
  - inventário em cartório com testamento ou herdeiro menor (partilha em partes ideais e manifestação favorável do MP).
  - As corregedorias estaduais podem ter regras próprias.
- [ ] Divórcio: decretação no início do processo "dependendo do juízo"; fim da separação judicial (STF, Tema 1.053).
- [ ] Separação obrigatória de bens: a página não menciona a Súmula 377 nem o Tema 1.236 do STF (pessoas com mais de 70 anos).
- [ ] Pensão:
  - alimentos ao ex-cônjuge por prazo determinado, "em geral";
  - prescrição de 2 anos por parcela (art. 206, § 2º, CC), que não corre entre pais e filhos menores.
- [ ] Inventário:
  - companheiro com as mesmas regras sucessórias do cônjuge (STF, Tema 809), "embora alguns pontos ainda gerem discussão";
  - multa do ITCMD conforme a lei estadual (Súmula 542 do STF), sem percentuais;
  - a reforma tributária pode alterar o ITCMD.
- [ ] Guarda compartilhada sem consenso e com pais em cidades diferentes: decisões do STJ citadas sem número.
- [ ] Reforma do Código Civil (PL 4/2025): se for aprovada, as páginas de família precisarão de revisão.

### Artigos novos (6, escritos em 05/11/2026)

| Artigo | Arquivo |
|---|---|
| Verbas rescisórias | `src/content/blog/verbas-rescisorias.md` |
| Horas extras | `src/content/blog/horas-extras.md` |
| Demissão por justa causa | `src/content/blog/justa-causa.md` |
| Pensão por morte do INSS | `src/content/blog/pensao-por-morte-inss.md` |
| Aposentadoria especial | `src/content/blog/aposentadoria-especial.md` |
| Nome negativado indevidamente | `src/content/blog/negativacao-indevida.md` |

**Horas extras (EC 141/2026)**
- [ ] **Período entre 16/10 e 16/12/2026:** o inciso XIII já está em vigor (art. 10, II), mas a redução para 42h só vale 2 meses depois (art. 6º, I). O artigo não afirma qual limite vale nesse intervalo.
- [ ] **Art. 7º da EC:** permite que norma coletiva amplie a jornada diária na transição. Está citado só de forma genérica.
- [ ] **Art. 8º da EC:** exclui das regras de jornada quem tem diploma superior e ganha 2,5 vezes ou mais o teto do RGPS. O artigo diz que a aplicação será definida pelos tribunais.
- [ ] **Divisores:** 220 e 200 (Súmula 431 do TST). O divisor da fase de 42h está como "pode mudar conforme o período".
- [ ] **Controle de ponto:** obrigatório para empresas com mais de 20 empregados (art. 74, § 2º, CLT). A Súmula 338 do TST, que ainda fala em 10, não foi citada.
- [ ] **Base de cálculo:** adicionais noturno e de insalubridade entram "em regra" (OJs 47 e 97 da SDI-1, citadas de memória).

**Verbas rescisórias**
- [ ] Aviso prévio proporcional só a favor do trabalhador, como "entendimento predominante".
- [ ] Saque-aniversário: quem aderiu recebe a multa mas não saca o saldo (art. 20-D, § 7º). Não foram citadas as regras transitórias de 2025.
- [ ] Acordo do art. 484-A imposto pela empresa "pode ser questionado".

**Justa causa**
- [ ] 13º proporcional não devido na justa causa, pela leitura do art. 3º da Lei 4.090/1962.
- [ ] Férias proporcionais não devidas (art. 146, parágrafo único, CLT; Súmula 171 do TST). Há debate com base na Convenção 132 da OIT.
- [ ] Critérios dos tribunais: abandono com referência de 30 dias, alcoolismo crônico como doença, imediatidade, proporcionalidade e proibição de punir duas vezes.

**Pensão por morte**
- [ ] Tabela de duração da cota pela Portaria ME 424/2020 (óbitos desde 1º/1/2021). Não foi descartada uma portaria mais nova.
- [ ] Menor sob guarda judicial: Lei 15.108/2025 (art. 16, § 2º) e o art. 23, § 6º, da EC 103/2019 ("exclusivamente" enteado e tutelado).
- [ ] Prova de união estável (art. 16, § 5º) e o "início de prova material nos 24 meses".
- [ ] Novo casamento não encerra a pensão; vedação de duas pensões de cônjuge (art. 124, VI). O acúmulo com aposentadoria (art. 24 da EC 103/2019) está simplificado.

**Aposentadoria especial**
- [ ] ⚠️ **ADI 6309 (STF, julgada em 03/06/2026):** derrubou as idades mínimas do art. 19, § 1º, I, da EC 103/2019, segundo o portal do STF. O acórdão teria sido publicado em 02/10/2026 (fontes secundárias). Há embargos pendentes. O artigo informa a decisão, mas não diz como o INSS está aplicando, nem se houve modulação de efeitos.
- [ ] Tema 1090 do STJ (EPI eficaz no PPP afasta o tempo especial "em princípio") e Tema 709 do STF, resumidos.
- [ ] PPP como prova a partir de 1º/1/2004; laudo de empresa semelhante ou perícia quando a empresa fechou, tratados como "dependente do caso".

**Negativação indevida**
- [ ] Notificação por e-mail ou SMS: há divergência no STJ (REsp 2.056.285/2023 e decisões posteriores). O artigo diz que depende do caso.
- [ ] Dano moral presumido (jurisprudência do STJ) e Súmula 385 aplicada contra o credor (REsp 1.386.424/MG, citado de memória).
- [ ] Prazo de 5 anos contado do dia seguinte ao vencimento (REsp 1.316.117 e REsp 2.095.414/SP): acórdãos não lidos.
- [ ] Súmula 479 do STJ: bancos respondem por fraudes de terceiros.

### Política de Privacidade

- [ ] Conferir se os prestadores citados estão corretos: FormSubmit (formulário), Google Firebase (hospedagem) e WhatsApp. Conferir também as bases legais (art. 7º, II, V e VI da LGPD).
- [ ] Se for incluído algum serviço de estatísticas (como Google Analytics), a política precisa ser atualizada **antes**.

---

Quando tudo estiver revisado, o conteúdo pode ser publicado junto com a migração (ver [MIGRACAO-DNS-FIREBASE.md](MIGRACAO-DNS-FIREBASE.md)).

## Acréscimos de 11/11/2026: páginas de cidade e artigos locais

Conteúdo novo, ainda não revisado pela Dra. Alice. Os dados de jurisdição trabalhista foram conferidos na [tabela oficial do TRT-15](https://trt15.jus.br/contato/jurisdicao) em 11/11/2026. O site do TRF3 não abriu durante a pesquisa.

### Páginas de cidade

- [ ] **Atendimento em São José dos Campos:** as páginas dizem "atendimento online para quem é de SJC, com reuniões presenciais agendadas na região". Confirmar se é isso mesmo ou se ela atende presencialmente em SJC.
- [ ] **Justiça Federal:** Taubaté = 21ª Subseção e SJC = 3ª Subseção, ambas com JEF. Os municípios de cada subseção não foram listados (TRF3 fora do ar).
- [ ] **Contrato de honorários** "por escrito, como recomenda o Código de Ética" (art. 48 do CED: "preferentemente").
- [ ] **Procuração assinada eletronicamente** e "originais só quando necessários".
- [ ] **Turnos de revezamento:** 6 horas (art. 7º, XIV, CF) e Súmula 423 do TST (até 8 horas por negociação coletiva).

### Ação trabalhista passo a passo

- [ ] Art. 844, § 2º, da CLT (custas para quem falta, mesmo com justiça gratuita) mantido pelo STF na ADI 5766.
- [ ] Justiça gratuita: "a declaração de insuficiência basta, salvo prova em contrário", conforme o entendimento atual do TST (incidente de recursos repetitivos de 2024, citado de memória).
- [ ] Honorários de sucumbência com justiça gratuita: suspensos por 2 anos (ADI 5766).
- [ ] Testemunhas: 3 no rito ordinário e 2 no sumaríssimo (arts. 821 e 852-H da CLT).

### PDV e demissão coletiva

- [ ] Art. 477-B da CLT e Tema 152 do STF (quitação ampla só se constar expressamente do acordo e dos documentos).
- [ ] Tema 638 do STF: intervenção sindical prévia, aplicada a dispensas posteriores ao julgamento (modulação citada de forma genérica).
- [ ] Súmula 215 do STJ (incentivo do PDV isento de IR).
- [ ] Plano de saúde, FGTS e seguro-desemprego tratados como "depende de como a saída é registrada".

### Lay-off

- [ ] Art. 476-A da CLT, §§ 1º a 7º (resumidos).
- [ ] Bolsa de qualificação: arts. 2º-A e 3º-A da Lei 7.998/1990 (valor e parcelas pelas regras do seguro-desemprego).
- [ ] ⚠️ "Em regra, não há depósito de FGTS durante a suspensão, salvo previsão no acordo coletivo": conferir.

### Estabilidade no emprego

- [ ] Gestante em contrato por prazo determinado: Súmula 244, III, x Tema 497 do STF, e trabalho temporário sem estabilidade (IAC do TST de 2019). O artigo diz que "há discussão".
- [ ] ⚠️ Pedido de demissão da gestante só válido com assistência sindical (art. 500 da CLT, segundo a jurisprudência do TST): conferir se ainda é o entendimento predominante.
- [ ] Súmulas 339, 369, 378, 379, 396 e 443 do TST e OJ 399 da SDI-1 (citadas de memória).
- [ ] Comissão de representantes (art. 510-D, § 3º) e CCP (art. 625-B, § 1º).

### Ação contra o INSS em Taubaté e SJC

- [ ] Tema 350 do STF (pedido prévio, sem necessidade de esgotar a via administrativa).
- [ ] Prazo de 30 dias para recurso ao CRPS (art. 305 do Decreto 3.048/1999).
- [ ] JEF: 60 salários mínimos, renúncia ao excedente (Tema 1030 do STJ), dispensa de advogado na 1ª instância (ADI 3.168) e RPV em 60 dias (art. 17 da Lei 10.259/2001).
- [ ] Acidentárias na Justiça Estadual (art. 109, I, CF; Súmula 15 do STJ) e isenção do art. 129, parágrafo único, da Lei 8.213/1991.
- [ ] Prazos: 5 anos de atrasados e 10 anos para revisão (art. 103), sem prazo para o pedido do benefício em si (Tema 313 do STF e ADI 6096, não citados no texto).
