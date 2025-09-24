const mockData = {
  profile: {
    name: "Yorram N.",
    title: "Desenvolvedor Full Stack | Líder Técnico",
    bio: "Atleta nas horas vagas e entusiasta da programação, fissurado por aprender e ensinar, busco compartilhar meu conhecimento e contribuir em projetos OpenSource e privados.",
    avatar: "https://avatars.githubusercontent.com/yorramn?v=4",
    github: "https://github.com/yorramn",
    linkedin: "https://linkedin.com/in/yorramn",
    email: "yorramn.dev@gmail.com",
    phone: "+55 (11) 99999-9999"
  },
  
  projects: [
    {
      name: "CV Creator",
      description: "Sistema completo para criação e gerenciamento de currículos profissionais com interface intuitiva e templates personalizáveis.",
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "JavaScript"],
      githubUrl: "https://github.com/yorramn/cv-creator",
      liveUrl: null,
      featured: true
    },
    {
      name: "Galactus Platform",
      description: "Plataforma empresarial robusta para gestão de projetos e recursos, desenvolvida com foco em escalabilidade e performance.",
      technologies: ["PHP", "Laravel", "Vue.js", "PostgreSQL", "Redis"],
      githubUrl: null,
      liveUrl: "https://ogalactus.com.br/",
      featured: true
    },
    {
      name: "API GraphQL Enterprise",
      description: "API enterprise desenvolvida em GraphQL para integração de sistemas corporativos com alta performance e flexibilidade.",
      technologies: ["PHP", "GraphQL", "Laravel", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/yorramn/graphql-api",
      liveUrl: null,
      featured: false
    },
    {
      name: "E-commerce Platform",
      description: "Plataforma de e-commerce completa com sistema de pagamentos, gestão de estoque e painel administrativo.",
      technologies: ["Laravel", "Vue.js", "Stripe", "MySQL", "Redis"],
      githubUrl: "https://github.com/yorramn/ecommerce-platform",
      liveUrl: null,
      featured: false
    },
    {
      name: "Task Management System",
      description: "Sistema ágil de gerenciamento de tarefas implementando metodologias Scrum e Kanban para equipes de desenvolvimento.",
      technologies: ["PHP", "Laravel", "React", "MySQL", "WebSockets"],
      githubUrl: "https://github.com/yorramn/task-manager",
      liveUrl: null,
      featured: false
    },
    {
      name: "Real-time Chat App",
      description: "Aplicação de chat em tempo real com suporte a salas, notificações push e integração com diferentes provedores.",
      technologies: ["Laravel", "WebSockets", "Redis", "Vue.js", "Pusher"],
      githubUrl: "https://github.com/yorramn/realtime-chat",
      liveUrl: null,
      featured: false
    }
  ],
  
  technologies: {
    backend: ["PHP", "Laravel", "Java", "GraphQL", "RESTful APIs", "Microservices"],
    frontend: ["JavaScript", "Vue.js", "React", "HTML5", "CSS3", "Bootstrap"],
    database: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQL Server"],
    tools: ["Docker", "Git", "Jenkins", "AWS", "Linux", "Scrum"]
  },
  
  testimonials: [
    {
      author: "Carlos Silva",
      position: "CTO - Galactus",
      content: "Yorram demonstrou excepcional liderança técnica em nossos projetos mais complexos. Sua capacidade de implementar soluções escaláveis e gerenciar equipes de desenvolvimento é impressionante. Recomendo fortemente seus serviços.",
      rating: 5,
      company: "Galactus"
    },
    {
      author: "Maria Santos",
      position: "Product Manager - Tech Solutions",
      content: "Trabalhar com Yorram foi uma experiência fantástica. Ele conseguiu entregar nossa plataforma no prazo, com qualidade excepcional e seguindo todas as melhores práticas de desenvolvimento. Um profissional exemplar.",
      rating: 5,
      company: "Tech Solutions"
    }
  ],
  
  experience: [
    {
      title: "Líder Técnico",
      company: "Galactus",
      period: "2022 - Presente",
      description: "Liderança de equipe de desenvolvimento, implementação de metodologias ágeis e arquitetura de soluções escaláveis."
    },
    {
      title: "Desenvolvedor Full Stack Pleno",
      company: "Freelancer",
      period: "2020 - 2022",
      description: "Desenvolvimento de aplicações web completas utilizando PHP, Laravel, JavaScript e bancos de dados relacionais."
    },
    {
      title: "Desenvolvedor Backend",
      company: "StartupTech",
      period: "2019 - 2020",
      description: "Desenvolvimento de APIs RESTful e integração de sistemas corporativos utilizando Laravel e MySQL."
    }
  ],
  
  skills: [
    { name: "PHP/Laravel", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "GraphQL", level: 85 },
    { name: "SQL/NoSQL", level: 90 },
    { name: "Liderança Técnica", level: 88 },
    { name: "Metodologias Ágeis", level: 92 }
  ]
};

export default mockData;