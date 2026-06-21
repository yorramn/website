const whatsappUrl = "https://api.whatsapp.com/send/?phone=5511989416584&text=Ol%C3%A1%2C+gostaria+de+fazer+um+or%C3%A7amento.&type=phone_number&app_absent=0";
const analyticsHead = `<meta property="og:image:width" content="9170"><meta property="og:image:height" content="2635"><meta property="og:image:alt" content="Yorramn Dev - Código que vira solução"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="https://yorramn.dev.br/assets/logo-principal.png"><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WXBP2PXV');</script><script async src="https://www.googletagmanager.com/gtag/js?id=G-7EYE9E4F6D"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-7EYE9E4F6D');</script>`;

const services = [
  {
    slug: "sistemas-web-sob-medida",
    short: "Sistemas web sob medida",
    title: "Desenvolvimento de Sistemas Web sob Medida",
    description: "Desenvolvimento de sistemas web, portais e painéis personalizados para automatizar processos e apoiar o crescimento da sua empresa.",
    eyebrow: "Software pensado para a sua operação",
    headline: "Um sistema que trabalha do jeito que sua empresa precisa.",
    lead: "Transformo processos manuais, planilhas e regras específicas do seu negócio em uma plataforma segura, simples de usar e preparada para evoluir.",
    intent: "Quero desenvolver um sistema web sob medida.",
    situations: ["Sua equipe depende de planilhas e tarefas repetitivas", "Soluções prontas não atendem às regras do negócio", "Informações importantes estão espalhadas em várias ferramentas", "Você precisa ganhar produtividade sem perder controle"],
    deliverables: [
      ["Diagnóstico da operação", "Mapeamento dos usuários, fluxos, gargalos e prioridades antes da primeira linha de código."],
      ["Experiência sob medida", "Painéis e jornadas desenhados para a rotina real de quem utilizará o sistema."],
      ["Integrações e automações", "Conexão com APIs, meios de pagamento, ERPs e outros serviços necessários."],
      ["Base preparada para crescer", "Arquitetura, banco de dados, segurança e documentação compatíveis com a evolução do produto."]
    ],
    faqs: [
      ["Preciso saber qual tecnologia usar?", "Não. A tecnologia é definida depois de entendermos o problema, o orçamento e a expectativa de crescimento."],
      ["É possível começar com uma versão menor?", "Sim. Podemos priorizar um MVP com as funções essenciais e evoluir a solução a partir do uso real."],
      ["O sistema pode integrar ferramentas que já utilizo?", "Na maioria dos casos, sim. A viabilidade depende das APIs e formas de integração oferecidas por cada ferramenta."],
      ["Há suporte após a entrega?", "Sim. Manutenção, monitoramento e evolução podem ser contratados conforme a necessidade do projeto."]
    ]
  },
  {
    slug: "sites-landing-pages-ecommerce",
    short: "Sites, landing pages e e-commerce",
    title: "Criação de Sites, Landing Pages e E-commerce",
    description: "Sites profissionais, landing pages e lojas virtuais rápidas, responsivas e orientadas a conversão para atrair clientes e vender mais.",
    eyebrow: "Presença digital que gera oportunidade",
    headline: "Seu site precisa ser bonito. E também precisa trazer resultado.",
    lead: "Crio experiências digitais rápidas, responsivas e alinhadas à sua marca para transformar visitas em contatos, orçamentos e vendas.",
    intent: "Quero criar um site, landing page ou e-commerce.",
    situations: ["Sua empresa ainda não transmite confiança no ambiente digital", "Você investe em anúncios, mas a página não converte", "O site é lento ou difícil de usar no celular", "Você quer começar ou profissionalizar suas vendas online"],
    deliverables: [
      ["Estratégia de conversão", "Conteúdo e hierarquia pensados para conduzir o visitante até a ação principal."],
      ["Design responsivo", "Experiência consistente e agradável em celulares, tablets e computadores."],
      ["SEO técnico", "Estrutura semântica, metadados e performance preparados para mecanismos de busca."],
      ["Medição de resultados", "Estrutura pronta para Analytics, tags de campanhas e acompanhamento de conversões."]
    ],
    faqs: [
      ["Landing page e site institucional são a mesma coisa?", "Não. A landing page foca uma oferta e uma conversão específica; o site institucional apresenta a empresa e diferentes soluções."],
      ["A página funciona com Google Ads?", "Sim. Ela pode ser estruturada para manter coerência entre anúncio, intenção de busca, conteúdo e chamada para ação."],
      ["Vocês desenvolvem lojas virtuais?", "Sim. Posso trabalhar com WooCommerce ou arquiteturas personalizadas, conforme catálogo, operação e integrações."],
      ["O conteúdo está incluído?", "A estrutura e a orientação de conteúdo fazem parte do trabalho. O escopo de redação completa é combinado na proposta."]
    ]
  },
  {
    slug: "consultoria-arquitetura-software",
    short: "Consultoria e arquitetura",
    title: "Consultoria e Arquitetura de Software",
    description: "Consultoria tecnológica para validar ideias, planejar produtos, escolher arquitetura e reduzir riscos antes ou durante o desenvolvimento.",
    eyebrow: "Decisões técnicas com contexto de negócio",
    headline: "Clareza para construir certo antes de gastar duas vezes.",
    lead: "Ajudo sua empresa a transformar uma ideia ou desafio técnico em um plano viável, com prioridades, arquitetura e próximos passos compreensíveis.",
    intent: "Preciso de consultoria ou arquitetura de software.",
    situations: ["Você tem uma ideia, mas ainda não sabe como transformá-la em produto", "O projeto começou sem uma direção técnica clara", "A equipe precisa escolher entre diferentes arquiteturas", "Custos, prazo ou complexidade estão fugindo do controle"],
    deliverables: [
      ["Descoberta e requisitos", "Entendimento do problema, usuários, regras e restrições que realmente afetam a solução."],
      ["Arquitetura recomendada", "Definição de componentes, integrações, dados e critérios técnicos de forma documentada."],
      ["Plano de execução", "Priorização por etapas, riscos, dependências e uma rota realista para desenvolvimento."],
      ["Apoio à equipe", "Revisão de decisões, direcionamento técnico e alinhamento entre tecnologia e negócio."]
    ],
    faqs: [
      ["A consultoria serve para quem ainda só tem uma ideia?", "Sim. É justamente o momento ideal para validar premissas e evitar decisões caras antes do desenvolvimento."],
      ["Vocês podem revisar uma arquitetura já existente?", "Sim. A análise pode cobrir código, infraestrutura, banco de dados, integrações e processo de entrega."],
      ["Recebo documentação ao final?", "Sim. Os materiais dependem do escopo, mas podem incluir requisitos, diagramas, recomendações e plano de ação."],
      ["A consultoria pode continuar durante o desenvolvimento?", "Sim. O acompanhamento técnico pode ocorrer de forma pontual ou recorrente."]
    ]
  },
  {
    slug: "refatoracao-sistemas-legados",
    short: "Refatoração e sustentação",
    title: "Refatoração de Sistemas Legados",
    description: "Refatoração de sistemas legados, correção de performance, segurança, arquitetura e sustentação para evoluir software com menos risco.",
    eyebrow: "Evolução sem apagar o que já funciona",
    headline: "Seu sistema não precisa ser refeito para voltar a evoluir.",
    lead: "Investigo gargalos e dívida técnica para modernizar a aplicação por etapas, reduzindo falhas, lentidão e medo de colocar novas funções em produção.",
    intent: "Quero avaliar ou refatorar um sistema existente.",
    situations: ["Cada alteração gera novos erros ou demora demais", "O sistema apresenta lentidão, indisponibilidade ou falhas recorrentes", "Tecnologias antigas dificultam contratação e manutenção", "O crescimento aumentou riscos no banco de dados e na infraestrutura"],
    deliverables: [
      ["Diagnóstico técnico", "Análise de código, arquitetura, banco de dados, logs e processo de publicação."],
      ["Plano de modernização", "Priorização por risco e retorno para evitar uma reescrita longa e desnecessária."],
      ["Refatoração segura", "Melhorias incrementais protegidas por testes, monitoramento e estratégia de reversão."],
      ["Sustentação contínua", "Correções, acompanhamento e evolução técnica para manter a aplicação saudável."]
    ],
    faqs: [
      ["É necessário reescrever todo o sistema?", "Geralmente não. Primeiro identificamos os pontos de maior risco e retorno para evoluir gradualmente."],
      ["Vocês trabalham com sistemas em produção?", "Sim. O plano considera disponibilidade, dados, testes e formas de reduzir impacto para os usuários."],
      ["É possível melhorar problemas de banco de dados?", "Sim. A análise pode incluir consultas, índices, concorrência, deadlocks e desenho das transações."],
      ["Também corrigem problemas pontuais?", "Sim. A atuação pode começar por um incidente ou gargalo específico e evoluir para um plano mais amplo."]
    ]
  }
];

const icons = {
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 4 5.2 5.2 0 0 0 19.1.5S17.9.1 15 1.8a13.4 13.4 0 0 0-7 0C5.1.1 3.9.5 3.9.5A5.2 5.2 0 0 0 3.7 4a5.5 5.5 0 0 0-1.5 3.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.01 3C8.83 3 3 8.72 3 15.78c0 2.25.6 4.45 1.74 6.38L3 28.5l6.62-1.7a13.1 13.1 0 0 0 6.38 1.6h.01C23.18 28.4 29 22.68 29 15.62 29 8.57 23.18 3 16.01 3Zm7.64 18.04c-.32.88-1.89 1.69-2.64 1.79-.68.1-1.54.14-2.48-.15-.57-.18-1.3-.42-2.24-.82-3.94-1.67-6.51-5.55-6.71-5.81-.2-.26-1.6-2.1-1.6-4.01 0-1.91 1.02-2.85 1.38-3.24.36-.39.79-.49 1.05-.49h.75c.24.01.56-.09.88.66.32.75 1.08 2.59 1.17 2.78.1.19.16.42.03.68-.13.26-.2.42-.39.65-.2.23-.41.51-.59.68-.2.19-.4.4-.17.79.23.39 1.02 1.65 2.19 2.68 1.5 1.32 2.77 1.73 3.16 1.92.39.19.62.16.85-.1.23-.26.98-1.13 1.24-1.52.26-.39.52-.32.88-.19.36.13 2.28 1.06 2.67 1.25.39.19.65.29.75.45.1.16.1.91-.22 1.79Z"/></svg>'
};

const header = () => `<header class="site-header" id="topo"><nav class="navbar container" aria-label="Navegação principal"><a class="brand" href="/" aria-label="Yorramn Dev, início"><img src="/assets/logobranco.png" alt="Yorramn Dev - Código que vira solução" width="260" height="78"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Abrir menu"><span></span><span></span><span></span></button><div class="nav-links" id="nav-links"><a href="/#solucoes">Soluções</a><a href="/#processo">Como funciona</a><a href="/#sobre">Sobre</a><a href="/#tecnologias">Tecnologias</a><a class="button button-small" href="/contato/">Falar sobre minha ideia</a></div></nav></header>`;

const footer = () => `<footer class="footer"><div class="container footer-grid"><a class="brand" href="/"><img src="/assets/logobranco.png" alt="Yorramn Dev" width="230" height="69"></a><p>Engenharia de software e consultoria tecnológica.<br>Código que vira solução.</p><div class="social-links"><a href="https://github.com/yorramn" target="_blank" rel="noopener noreferrer">${icons.github}GitHub</a><a href="mailto:yorramn.dev@gmail.com">${icons.mail}yorramn.dev@gmail.com</a><a href="tel:+5511989416584">${icons.phone}+55 (11) 98941-6584</a></div></div><div class="container footer-bottom"><span>&copy; <span id="year"></span> Yorramn Dev. Todos os direitos reservados.</span></div></footer>`;

const floating = () => `<a class="whatsapp-float" href="${whatsappUrl.replaceAll("&", "&amp;")}" target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp">${icons.whatsapp}</a><a class="back-to-top" href="#topo" aria-label="Voltar ao topo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg></a>`;

const baseHead = ({ title, description, path, schema }) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | Yorramn Dev</title><meta name="description" content="${description}"><meta name="robots" content="index, follow"><meta name="theme-color" content="#171225"><link rel="canonical" href="https://yorramn.dev.br${path}"><link rel="icon" type="image/png" href="/assets/favicon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/styles-overrides.css"><link rel="stylesheet" href="/pages.css"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:url" content="https://yorramn.dev.br${path}"><meta property="og:title" content="${title} | Yorramn Dev"><meta property="og:description" content="${description}"><meta property="og:image" content="https://yorramn.dev.br/assets/logo-principal.png"><script type="application/ld+json">${JSON.stringify(schema)}</script>${analyticsHead}</head>`;

function servicePage(service) {
  const path = `/servicos/${service.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: service.title, description: service.description, provider: { "@type": "ProfessionalService", name: "Yorramn Dev", url: "https://yorramn.dev.br" }, areaServed: { "@type": "Country", name: "Brasil" }, url: `https://yorramn.dev.br${path}` },
      { "@type": "FAQPage", mainEntity: service.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: "https://yorramn.dev.br/" }, { "@type": "ListItem", position: 2, name: "Serviços", item: "https://yorramn.dev.br/#solucoes" }, { "@type": "ListItem", position: 3, name: service.short, item: `https://yorramn.dev.br${path}` }] }
    ]
  };
  const otherServices = services.filter(({ slug }) => slug !== service.slug).map((item) => `<a href="/servicos/${item.slug}/">${item.short}<span>→</span></a>`).join("");
  return `${baseHead({ title: service.title, description: service.description, path, schema })}<body class="inner-page"><a class="skip-link" href="#conteudo">Ir para o conteúdo</a>${header()}<main id="conteudo"><section class="service-hero"><div class="container"><nav class="breadcrumbs" aria-label="Navegação estrutural"><a href="/">Início</a><span>/</span><a href="/#solucoes">Serviços</a><span>/</span><span>${service.short}</span></nav><div class="service-hero-grid"><div><p class="eyebrow">${service.eyebrow}</p><h1>${service.headline}</h1><p>${service.lead}</p><div class="service-actions"><a class="button" href="/contato/?servico=${service.slug}">Solicitar uma conversa <span>→</span></a><a class="service-whatsapp" href="${whatsappUrl.replaceAll("&", "&amp;")}" target="_blank" rel="noopener noreferrer">${icons.whatsapp} Falar pelo WhatsApp</a></div></div><aside class="service-summary"><span>O que você recebe</span><strong>Estratégia</strong><strong>Desenvolvimento</strong><strong>Acompanhamento</strong><small>Uma solução explicada sem tecnicês e construída com transparência.</small></aside></div></div></section><section class="page-section light-section"><div class="container split-heading"><div><p class="eyebrow eyebrow-violet">Reconhece este cenário?</p><h2>Quando este serviço faz sentido</h2></div><ul class="check-list">${service.situations.map((item) => `<li>${item}</li>`).join("")}</ul></div></section><section class="page-section dark-section"><div class="container"><div class="page-heading"><p class="eyebrow">Do problema à entrega</p><h2>O que faz parte do trabalho</h2><p>Cada projeto é dimensionado para a necessidade real da empresa. Estes são os pilares mais comuns.</p></div><div class="deliverables-grid">${service.deliverables.map(([title, text], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section><section class="page-section light-section"><div class="container"><div class="page-heading"><p class="eyebrow eyebrow-violet">Processo claro</p><h2>Como começamos</h2></div><ol class="mini-process"><li><span>1</span><div><h3>Diagnóstico</h3><p>Conversamos sobre contexto, objetivo, usuários e limitações.</p></div></li><li><span>2</span><div><h3>Proposta</h3><p>Você recebe escopo, etapas, investimento e próximos passos.</p></div></li><li><span>3</span><div><h3>Execução</h3><p>O trabalho avança com validações frequentes e comunicação direta.</p></div></li></ol></div></section><section class="page-section faq-section"><div class="container faq-layout"><div><p class="eyebrow">Dúvidas frequentes</p><h2>Antes de dar o próximo passo</h2></div><div class="faq-list">${service.faqs.map(([question, answer]) => `<details><summary>${question}<span>+</span></summary><p>${answer}</p></details>`).join("")}</div></div></section><section class="page-cta"><div class="container"><p class="eyebrow">Vamos entender seu cenário?</p><h2>Conte o que precisa resolver. A parte técnica pode ficar comigo.</h2><a class="button" href="/contato/?servico=${service.slug}">Quero conversar sobre este serviço <span>→</span></a></div></section><section class="related-services"><div class="container"><h2>Conheça também</h2><div>${otherServices}</div></div></section></main>${footer()}${floating()}<script src="/script.js" defer></script></body></html>`;
}

function contactPage() {
  const path = "/contato/";
  const schema = { "@context": "https://schema.org", "@type": "ContactPage", name: "Contato | Yorramn Dev", description: "Conte sua ideia ou desafio de software e solicite uma conversa com a Yorramn Dev.", url: `https://yorramn.dev.br${path}`, mainEntity: { "@type": "ProfessionalService", name: "Yorramn Dev", telephone: "+5511989416584", email: "yorramn.dev@gmail.com" } };
  return `${baseHead({ title: "Contato para Desenvolvimento de Software", description: "Conte sua ideia ou desafio de software. Solicite uma conversa sobre sistemas web, sites, e-commerce, consultoria ou refatoração.", path, schema })}<body class="inner-page contact-page"><a class="skip-link" href="#conteudo">Ir para o conteúdo</a>${header()}<main id="conteudo"><section class="contact-page-section"><div class="container contact-page-grid"><div class="contact-intro"><nav class="breadcrumbs" aria-label="Navegação estrutural"><a href="/">Início</a><span>/</span><span>Contato</span></nav><p class="eyebrow">Vamos conversar?</p><h1>Conte sua ideia do seu jeito.</h1><p>Você não precisa escrever um briefing perfeito ou conhecer a tecnologia certa. Explique o cenário e eu retorno para fazermos as perguntas necessárias juntos.</p><ul><li>Diagnóstico inicial claro</li><li>Conversa sem compromisso</li><li>Resposta diretamente com o especialista</li></ul><a class="service-whatsapp" href="${whatsappUrl.replaceAll("&", "&amp;")}" target="_blank" rel="noopener noreferrer">${icons.whatsapp} Prefere WhatsApp? Fale comigo</a></div><form class="contact-form" id="contact-form"><input type="hidden" id="service" name="service" value=""><div class="form-context" id="form-context" hidden><span>Assunto selecionado</span><strong id="form-context-label"></strong></div><div class="form-row"><label for="name">Como posso te chamar?<input id="name" name="name" type="text" autocomplete="name" required placeholder="Seu nome"></label><label for="email">Seu melhor e-mail<input id="email" name="email" type="email" autocomplete="email" required placeholder="voce@empresa.com.br"></label></div><label for="phone">WhatsApp ou telefone<input id="phone" name="phone" type="tel" autocomplete="tel" required placeholder="(11) 99999-9999"></label><label for="message">O que você gostaria de resolver?<textarea id="message" name="message" rows="6" required placeholder="Ex.: tenho uma ideia de sistema, mas ainda não sei como começar..."></textarea></label><button class="button form-submit" type="submit">Enviar minha mensagem <span aria-hidden="true">→</span></button><small>Seus dados serão usados apenas para responder a este contato.</small></form></div></section></main>${footer()}${floating()}<div class="toast" id="form-toast" role="status" aria-live="polite" aria-atomic="true"><span class="toast-icon" aria-hidden="true"></span><div><strong id="toast-title"></strong><p id="toast-message"></p></div><button type="button" aria-label="Fechar aviso">&times;</button></div><script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script><script src="/script.js" defer></script></body></html>`;
}

function generatedPages() {
  const pages = new Map(services.map((service) => [`servicos/${service.slug}/index.html`, servicePage(service)]));
  pages.set("contato/index.html", contactPage());
  return pages;
}

module.exports = { services, generatedPages };
