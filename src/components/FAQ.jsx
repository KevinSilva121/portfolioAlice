import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Fui demitido sem justa causa. Quais são os meus direitos ao sair da empresa?",
      answer: "Em casos de demissão sem justa causa, o trabalhador geralmente tem direito a aviso prévio (trabalhado ou indenizado), 13º salário proporcional, férias proporcionais vencidas (com acréscimo de 1/3), saque do saldo do FGTS e a multa de 40%, além da guia para o Seguro-Desemprego. Verbas rescisórias possuem prazos curtos e estritos para pagamento. Se você suspeita que o valor pago está incorreto ou a empresa atrasou o depósito, chame em nosso WhatsApp para realizarmos o cálculo de verificação e exigirmos seus direitos."
    },
    {
      question: "Trabalho exposto a barulho e produtos perigosos, mas nunca recebi adicional. O que fazer?",
      answer: "Locais com altos níveis de ruído ou agentes químicos/biológicos nocivos podem gerar o direito aos adicionais de Insalubridade (10% a 40% do salário mínimo) ou Periculosidade (30% sobre o salário-base). Essa não é apenas uma questão de salário, mas do seu bem estar ao longo do tempo. Podemos analisar seu ambiente de trabalho e requerer esse direito retroativo dos últimos 5 anos. Clique no botão do WhatsApp e nos conte com o que você trabalha para entendermos a viabilidade do seu caso legalmente."
    },
    {
      question: "Meu pedido de aposentadoria no INSS foi negado. Devo apenas aceitar ou abrir um novo?",
      answer: "Em mais de 40% dos casos o INSS nega benefícios por falta de documentação adequada ou análise errada do servidor, e não pela falta do seu direito! Não desista e não abra um novo requerimento sem planejamento, pois isso pode zerar todo o tempo de espera dos meses em atraso. Nós fazemos a revisão completa do motivo da negativa administrativa e apresentamos o recurso necessário (Administrativo ou Judicial). Fale comigo no WhatsApp e me passe a carta do INSS para que possamos traçar a estratégia."
    },
    {
      question: "Sofri um acidente de trabalho e não sei se tenho algum amparo enquanto me recupero. Qual o próximo passo?",
      answer: "Acidentes de trabalho resguardam direitos cruciais e urgentes para o acidentado, como o recebimento do Auxílio-Doença Acidentário (B91), a exigência de que a empresa arque com o depósito de seu FGTS durante seu afastamento, e até 12 meses de estabilidade ao retornar ao trabalho após a reabilitação. Muitas empresas tentam desviar de emitir a 'CAT' para encobrir a situação. Acione nosso WhatsApp agora para elaborarmos sua proteção patrimonial e não deixar que você seja prejudicado neste momento de fragilidade."
    },
    {
      question: "Quero me divorciar, mas não sabemos como dividir os bens ou se preciso sair de casa agora. Como agir?",
      answer: "Cada regime de união estipula diretrizes estritas. Pela lei brasileira, por exemplo, união em 'Comunhão Parcial de Bens' partilha o que foi adquirido durante a constância do casamento em regra geral 50/50. Sobre sair do lar, é vital que isso não seja configurado como abandono. Tratar do divórcio exige cuidado jurídico para proteger seu legado financeiro e guarda física, visando o menor trauma familiar viável. Envie-nos uma mensagem sigilosa pelo WhatsApp para resguardar o que é seu por direito."
    },
    {
      question: "O pai/mãe não está pagando a pensão alimentícia da criança como foi combinado. Posso impedir as visitas?",
      answer: "Não. A visitação do filho constitui um direito da própria criança para fortalecer o vínculo familiar e não deve ser utilizada como ferramenta de renegociação financeira — a lei repudia a 'alienação parental'. No entanto, a execução dos valores da pensão não paga possui mecanismos fortíssimos pelo sistema Judiciário, desde a penhora de conta em banco, até, em casos mais graves, a ordem de prisão civil por prazo de 1 a 3 meses para o devedor omisso. Para cobrarmos a dívida judicialmente e de forma célere, me chame pelo WhatsApp que daremos o andamento."
    },
    {
      question: "Comprei algo pela internet, o produto veio com defeito e a loja diz não poder fazer nada. Quais meus direitos?",
      answer: "O Código de Defesa do Consumidor é taxativo: Para compras efetuadas fora do estabelecimento físico, você detém do chamado 'Direito de Arrependimento', com um prazo de 7 dias contados a partir do recebimento do produto para solicitar estorno integral de qualquer valor. Para defeitos de fabricação em 'produtos duráveis' contata-se 90 dias com o fabricante. Fornecedores frequentemente negam isso para vencer o consumidor pelo cansaço. Envie-nos uma print expondo o nome da loja via WhatsApp e formularemos sua Notificação Extrajudicial."
    },
    {
      question: "Tenho sofrido ofensas/humilhações repetidas pelo meu chefe na frente dos outros colegas. Isso é causa ganha?",
      answer: "Esta é a característica clássica de 'Assédio Moral no Trabalho', visando menosprezar ou adoecer o trabalhador. Não existem causas ganhas precocemente, mas os litígios ajuizados com um arcabouço sólido de provas (testemunhas visuais de confiança, registros de e-mail, áudios desproporcionais ou conversas digitais) tem ampla chance de indenização na Justiça do Trabalho. A depender da inviabilidade, entramos com pedido de Rescisão Indireta (uma demissão com justa causa na figura do patrão). Faça capturas de tela e fale conosco sigilosamente via WhatsApp."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Dúvidas Frequentes</h2>
        <p className="section-subtitle animate-on-scroll">Entenda seus direitos nas principais áreas da lei e saiba como podemos intervir para proteger seus interesses.</p>
        
        <div className="faq-container animate-on-scroll">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`faq-icon ${openIndex === index ? 'rotate' : ''}`} size={20} />
              </button>
              
              <div 
                className="faq-answer-wrapper"
                style={{ 
                  maxHeight: openIndex === index ? '500px' : '0',
                  opacity: openIndex === index ? 1 : 0
                }}
              >
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                  <a 
                    href={`https://wa.me/5512997748723?text=${encodeURIComponent("Olá Dra. Alice! Li sobre o seguinte tema no seu site e preciso de orientação profissional: " + faq.question)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="faq-whatsapp-link"
                  >
                    <MessageCircle size={16} /> Meu caso se parece com esse, quero falar sobre isso.
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
