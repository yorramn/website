import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "../hooks/use-toast";
import { Toaster } from "./ui/toaster";
import LoadingSpinner from "./LoadingSpinner";
import useEmblaCarousel from 'embla-carousel-react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Code, 
  Database, 
  Globe,
  MessageCircle,
  User,
  Briefcase,
  Star,
  Users,
  Settings,
  Target,
  FileText,
  Calendar,
  Layers,
  CheckCircle,
  MessageSquare,
  Wrench,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Building2,
  TrendingUp,
  Shield
} from "lucide-react";
import mockData from "../data/mock";
import { apiService } from "../services/api";

const Portfolio = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { toast } = useToast();

  // Fetch GitHub repositories on component mount
  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setIsLoadingProjects(true);
      const response = await apiService.getGitHubRepos();
      setProjects(response.repos || []);
    } catch (error) {
      console.error('Error fetching repos:', error);
      // Fallback to mock data if API fails
      setProjects(mockData.projects);
      toast({
        title: "Aviso",
        description: "Usando dados locais. Alguns projetos podem não estar atualizados.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmittingForm(true);
      
      await apiService.sendContactForm(formData);
      
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Retornaremos em breve.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
      
    } catch (error) {
      console.error('Error sending contact form:', error);
      
      let errorMessage = "Erro ao enviar mensagem. Tente novamente mais tarde.";
      
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'object') {
          errorMessage = error.response.data.detail.message || errorMessage;
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      toast({
        title: "Erro ao enviar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const openWhatsApp = () => {
    const message = "Olá, gostaria de fazer um orçamento.";
    const whatsappUrl = `https://wa.me/5511989416584?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
              Yorramn
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#sobre" className="text-gray-600 hover:text-orange-600 transition-colors">
                Sobre
              </a>
              <a href="#projetos" className="text-gray-600 hover:text-orange-600 transition-colors">
                Projetos
              </a>
              <a href="#tecnologias" className="text-gray-600 hover:text-orange-600 transition-colors">
                Tecnologias
              </a>
              <a href="#contato" className="text-gray-600 hover:text-orange-600 transition-colors">
                Contato
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Desenvolvedor
                <span className="block text-orange-500">Full Stack</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Líder Técnico especializado em soluções web escaláveis e metodologias ágeis
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={openWhatsApp}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Solicitar Orçamento
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-400 text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Ver Projetos
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-orange-500 shadow-2xl">
                <img 
                  src={mockData.profile.avatar} 
                  alt="Yorramn"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Sobre Mim
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <User className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Quem Sou</h3>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Atleta nas horas vagas e entusiasta da programação, fissurado por aprender e ensinar, 
                  busco compartilhar meu conhecimento e contribuir em projetos OpenSource e privados, 
                  como de empresas, de forma clara e objetiva na resolução e entrega escaláveis e personalizadas.
                </p>
                <p>
                  Analista e Desenvolvedor de Sistemas, focado no Desenvolvimento Web FullStack Pleno, 
                  Líder Técnico e aspirante a palestrante, decidido a me desenvolver na área e focar toda 
                  experiência obtida com projetos, em vias de alternativa para soluções ágeis.
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <Briefcase className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Experiência</h3>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Me vejo inspirado em adquirir experiência e entrar no processo de consolidação de minha carreira, 
                  e hoje posso dizer que uma das minhas maiores conquistas foi (e continua sendo) atuar como 
                  Líder Técnico, liderando a equipe de desenvolvimento na parte técnica.
                </p>
                <p>
                  Realizando e seguindo os ritos do Scrum, me vejo realizado neste papel tão importante, 
                  sempre buscando soluções inovadoras e eficientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Projetos em Destaque
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingProjects ? (
              <div className="col-span-full">
                <LoadingSpinner size="lg" text="Carregando projetos do GitHub..." />
              </div>
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {project.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="p-2">
                              <Github className="h-4 w-4 text-gray-600" />
                            </Button>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="p-2">
                              <ExternalLink className="h-4 w-4 text-gray-600" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-gray-600">
                      {project.description}
                    </CardDescription>
                    {(project.stars > 0 || project.forks > 0) && (
                      <div className="flex gap-4 text-sm text-gray-500">
                        {project.stars > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.forks > 0 && (
                          <div className="flex items-center gap-1">
                            <Github className="h-3 w-3" />
                            <span>{project.forks}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="bg-gray-200 text-gray-700 hover:bg-orange-100"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">Nenhum projeto encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tecnologias
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-12 w-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Backend</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {mockData.technologies.backend.map((tech, index) => (
                  <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Frontend</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {mockData.technologies.frontend.map((tech, index) => (
                  <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Database className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Database</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {mockData.technologies.database.map((tech, index) => (
                  <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Empresas que Confiam no Nosso Serviço
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
                G
              </div>
              <h3 className="font-semibold text-gray-800">Galactus</h3>
              <p className="text-sm text-gray-600 text-center">Plataforma Empresarial</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
                TS
              </div>
              <h3 className="font-semibold text-gray-800">Tech Solutions</h3>
              <p className="text-sm text-gray-600 text-center">Consultoria Técnica</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
                ST
              </div>
              <h3 className="font-semibold text-gray-800">StartupTech</h3>
              <p className="text-sm text-gray-600 text-center">Desenvolvimento Backend</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
                FL
              </div>
              <h3 className="font-semibold text-gray-800">Freelance</h3>
              <p className="text-sm text-gray-600 text-center">Projetos Diversos</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-800">Outros Clientes</h3>
              <p className="text-sm text-gray-600 text-center">Projetos Corporativos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Serviços Oferecidos
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas em desenvolvimento e gestão de projetos com foco em qualidade e resultados
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Code className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Desenvolvimento</h3>
                <p className="text-gray-600">
                  Desenvolvimento de aplicações web completas utilizando as melhores tecnologias do mercado como PHP, Laravel, JavaScript e bancos de dados robustos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Liderança Técnica</h3>
                <p className="text-gray-600">
                  Liderança de equipes de desenvolvimento, definição de arquiteturas e implementação de boas práticas para garantir a qualidade do código.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Settings className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Micro Projetos</h3>
                <p className="text-gray-600">
                  Desenvolvimento rápido de funcionalidades específicas, APIs, integrações e soluções pontuais com foco em agilidade e eficiência.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Análise de Requisitos</h3>
                <p className="text-gray-600">
                  Levantamento detalhado de necessidades, documentação técnica e definição de escopo para garantir o sucesso do projeto.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Gestão KANBAN - SPRINT</h3>
                <p className="text-gray-600">
                  Implementação e gestão de metodologias ágeis, organização de sprints e acompanhamento de progresso usando ferramentas modernas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Layers className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Projetos de Alta Complexidade</h3>
                <p className="text-gray-600">
                  Desenvolvimento de sistemas enterprise, arquiteturas escaláveis e soluções robustas para grandes volumes de dados e usuários.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Como Funciona o Orçamento
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um processo transparente e organizado para garantir que seu projeto seja desenvolvido com excelência
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md relative">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-orange-600" />
                      <h3 className="text-lg font-bold text-gray-800">Reunião Gratuita</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Conversamos sobre suas necessidades, objetivos do projeto e expectativas. Esta etapa é totalmente gratuita e sem compromisso.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-800">Alinhamento Técnico</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Definimos tecnologias, cronograma, valores e metodologia. Você recebe uma proposta detalhada e transparente.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-bold text-gray-800">Desenvolvimento</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Início do desenvolvimento seguindo as melhores práticas, com acompanhamento constante e testes rigorosos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <h3 className="text-lg font-bold text-gray-800">Validação</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Você testa e valida todas as funcionalidades. Se necessário, fazemos ajustes e melhorias sem custos adicionais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    5
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-indigo-600" />
                      <h3 className="text-lg font-bold text-gray-800">Entrega Final</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Entrega do projeto completo com documentação, treinamento se necessário e coleta de feedback para futuras melhorias.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 6 - Extra */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md border-2 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <h3 className="text-lg font-bold text-gray-800">Manutenção</h3>
                      <Badge className="bg-orange-100 text-orange-800 text-xs">Extra</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Oferecemos serviços de manutenção e suporte contínuo com valores competitivos e atendimento prioritário.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={openWhatsApp}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Solicitar Orçamento Gratuito
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Depoimentos
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {mockData.testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-gray-400">{testimonial.position}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Entre em Contato
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-semibold">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Descreva seu projeto ou necessidade..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmittingForm}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
                >
                  {isSubmittingForm ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Yorramn</h3>
              <p className="text-gray-400 mb-4">
                Desenvolvedor Full Stack especializado em soluções web escaláveis
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-600">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-600">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-600">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Desenvolvimento Web</li>
                <li>Aplicações Full Stack</li>
                <li>Liderança Técnica</li>
                <li>Consultoria em Tecnologia</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  yorramn.dev@gmail.com
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +55 (11) 98941-6584
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Yorramn. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <Toaster />
    </div>
  );
};

export default Portfolio;