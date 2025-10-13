import React, {useState, useEffect, useCallback} from "react";
import {Button} from "./ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card";
import {Badge} from "./ui/badge";
import {Input} from "./ui/input";
import {Textarea} from "./ui/textarea";
import {Label} from "./ui/label";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "./ui/toaster";
import LoadingSpinner from "./LoadingSpinner";
import useEmblaCarousel from 'embla-carousel-react';
import {Disclosure, DisclosureButton, DisclosurePanel, MenuButton, MenuItem, MenuItems, Menu} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
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
    Shield, Cpu, ChevronDownIcon, FolderOpen
} from "lucide-react";
import mockData from "../data/mock";
import {apiService} from "@/services/api";
import * as emailjs from "@emailjs/browser";
import Nav from "@/components/Nav";

const Portfolio = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "Olá, gostaria de realizar um orçamento!\nMeu projeto é sobre..."
    });
    const [projects, setProjects] = useState([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const {toast} = useToast();

    // Carousel setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false,
        dragFree: false
    });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);

        // Auto-play functionality
        const autoplay = setInterval(() => {
            if (emblaApi && emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else if (emblaApi) {
                emblaApi.scrollTo(0);
            }
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(autoplay);
    }, [emblaApi, onSelect]);

    // Companies data
    const companies = [
        {
            id: 1,
            name: "Galactus",
            title: "Landing Page - SPA",
            description: "Desenvolvimento de portifólio, landing page e SPA de ponte para clientes que desejam fazer eventos.",
            logo: "G",
            gradient: "from-blue-600 to-blue-800",
            metrics: "1k+ orçamentos realizados",
            duration: "2022 - Presente",
            testimonial: "Excelente desenvolvimento, entrega rápida e agilidade na resposta"
        },
        {
            id: 2,
            name: "Juliamota Design",
            title: "SPA - Sistema Web Mobile",
            description: "Elaboração de SPA's visando trazer leads e performance para alcance de novos clientes",
            logo: "JMD",
            gradient: "from-green-600 to-green-800",
            metrics: "95% performance",
            duration: "2024 - 2025",
            testimonial: "Me trouxe resultados quase que imediatamente!"
        },
        // {
        //     id: 3,
        //     name: "StartupTech",
        //     title: "Desenvolvimento Backend",
        //     description: "Implementação de APIs robustas e integração de sistemas para startup em crescimento acelerado.",
        //     logo: "ST",
        //     gradient: "from-purple-600 to-purple-800",
        //     metrics: "50+ APIs",
        //     duration: "2019 - 2020",
        //     testimonial: "Soluções inovadoras e código de alta qualidade"
        // },
        // {
        //     id: 4,
        //     name: "E-Commerce Solutions",
        //     title: "Plataforma de Vendas",
        //     description: "Desenvolvimento completo de plataforma e-commerce com gateway de pagamento e gestão de estoque.",
        //     logo: "ES",
        //     gradient: "from-orange-600 to-red-600",
        //     metrics: "R$ 2M+ vendas",
        //     duration: "2020 - 2021",
        //     testimonial: "ROI excepcional com implementação ágil"
        // },
        // {
        //     id: 5,
        //     name: "FinTech Brasil",
        //     title: "Sistema Financeiro",
        //     description: "Desenvolvimento de sistema financeiro seguro com integração bancária e conformidade regulatória.",
        //     logo: "FB",
        //     gradient: "from-indigo-600 to-indigo-800",
        //     metrics: "100% uptime",
        //     duration: "2020 - 2021",
        //     testimonial: "Segurança e confiabilidade incomparáveis"
        // }
    ];
    // Fetch GitHub repositories on component mount
    // useEffect(() => {
    //     setIsLoadingProjects(true);
    //
    //     const _isFeaturedRepo = (repo) => {
    //         const featuredNames = ['cv-creator', 'galactus', 'portfolio', 'api', 'ecommerce'];
    //         const name = (repo.name || '').toLowerCase();
    //         const stars = repo.stargazers_count || 0;
    //         const hasDescription = Boolean(repo.description);
    //
    //         const hasFeaturedName = featuredNames.some(featuredName =>
    //             name.includes(featuredName)
    //         );
    //
    //         if (hasFeaturedName) {
    //             return true;
    //         }
    //
    //         return stars > 2 && hasDescription;
    //     };
    //
    //     const _extractLiveUrl = (repo) => {
    //         const homepage = repo.homepage;
    //         if (homepage && homepage.startsWith('http')) {
    //             return homepage;
    //         }
    //
    //         if (repo.has_pages) {
    //             return `https://${repo.owner?.login || 'yorramn'}.github.io/${repo.name || ''}`;
    //         }
    //
    //         return null;
    //     };
    //
    //     const _extractTechnologies = (repo, languagesData = {}) => {
    //         const technologies = [];
    //
    //         // Primary language from repo data
    //         if (repo.language) {
    //             technologies.push(repo.language);
    //         }
    //
    //         // Add languages from languages_url API response
    //         const languagesFromApi = Object.keys(languagesData);
    //         technologies.push(...languagesFromApi);
    //
    //         // Common web technologies based on repo name and description
    //         const name = (repo.name || '').toLowerCase();
    //         const description = (repo.description || '').toLowerCase();
    //
    //         const hasTerm = (terms) => {
    //             return terms.some(term => name.includes(term) || description.includes(term));
    //         };
    //
    //         // Backend technologies
    //         if (hasTerm(['laravel', 'php'])) {
    //             if (!technologies.includes('Laravel')) technologies.push('Laravel');
    //             if (!technologies.includes('PHP')) technologies.push('PHP');
    //         }
    //
    //         if (hasTerm(['java', 'spring'])) {
    //             if (!technologies.includes('Java')) technologies.push('Java');
    //         }
    //
    //         if (hasTerm(['graphql', 'gql'])) {
    //             technologies.push('GraphQL');
    //         }
    //
    //         // Frontend technologies
    //         if (hasTerm(['vue', 'vuejs'])) {
    //             technologies.push('Vue.js');
    //         }
    //
    //         if (hasTerm(['react', 'reactjs'])) {
    //             technologies.push('React');
    //         }
    //
    //         if (hasTerm(['javascript', 'js'])) {
    //             technologies.push('JavaScript');
    //         }
    //
    //         // Database technologies
    //         if (hasTerm(['mysql', 'sql'])) {
    //             technologies.push('MySQL');
    //         }
    //
    //         if (hasTerm(['postgres', 'postgresql'])) {
    //             technologies.push('PostgreSQL');
    //         }
    //
    //         if (hasTerm(['mongo', 'mongodb'])) {
    //             technologies.push('MongoDB');
    //         }
    //
    //         // Infrastructure
    //         if (hasTerm(['docker', 'dockerfile'])) {
    //             technologies.push('Docker');
    //         }
    //
    //         // Remove duplicates and return max 6 technologies
    //         const uniqueTechnologies = [...new Set(technologies)];
    //         return uniqueTechnologies.slice(0, 6);
    //     };
    //
    //     // Função para buscar linguagens de um repositório
    //     const fetchRepoLanguages = async (languagesUrl) => {
    //         try {
    //             const response = await fetch(languagesUrl, {
    //                 headers: {
    //                     Authorization: "Bearer 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"
    //                 }
    //             });
    //             return await response.json();
    //         } catch (error) {
    //             console.error('Error fetching languages:', error);
    //             return {};
    //         }
    //     };
    //
    //     // Função principal que busca repositórios e depois as linguagens
    //     const fetchAllData = async () => {
    //         try {
    //             // Primeiro, busca os repositórios
    //             const repos = await fetchGitHubRepos();
    //             const filteredRepos = repos.filter(({id}) => id !== 1064937645).sort((a, b) => b.name - a.name);
    //
    //             // Agora, para cada repositório, busca as linguagens
    //             const projectsWithLanguages = await Promise.all(
    //                 filteredRepos.map(async (repo) => {
    //                     try {
    //                         // Busca as linguagens do repositório
    //                         const languagesData = await fetchRepoLanguages(repo.languages_url);
    //
    //                         return {
    //                             name: repo.name,
    //                             description: repo.description ?? 'Este projeto não contém descrição.',
    //                             githubUrl: repo.html_url ?? '',
    //                             liveUrl: _extractLiveUrl(repo),
    //                             stars: repo.stargazers_count ?? '',
    //                             forks: repo.forks_count ?? '',
    //                             language: repo.language ?? 'Unknown',
    //                             updated_at: repo.updated_at ?? '',
    //                             technologies: _extractTechnologies(repo, languagesData),
    //                             featured: _isFeaturedRepo(repo)
    //                         };
    //                     } catch (error) {
    //                         console.error(`Error processing repo ${repo.name}:`, error);
    //                         return {
    //                             name: repo.name,
    //                             description: repo.description ?? 'Este projeto não contém descrição.',
    //                             githubUrl: repo.html_url ?? '',
    //                             liveUrl: _extractLiveUrl(repo),
    //                             stars: repo.stargazers_count ?? '',
    //                             forks: repo.forks_count ?? '',
    //                             language: repo.language ?? 'Unknown',
    //                             updated_at: repo.updated_at ?? '',
    //                             technologies: _extractTechnologies(repo), // Sem linguagens da API
    //                             featured: _isFeaturedRepo(repo)
    //                         };
    //                     }
    //                 }).slice(0, 9)
    //             );
    //
    //             setProjects(projectsWithLanguages);
    //         } catch (error) {
    //             console.error('Error in fetchAllData:', error);
    //             // Fallback para dados mock
    //             setProjects(mockData.projects);
    //             toast({
    //                 title: "Aviso",
    //                 description: "Usando dados locais. Alguns projetos podem não estar atualizados.",
    //                 variant: "destructive",
    //             });
    //         }
    //     };
    //
    //     fetchAllData().finally(() => {
    //         setIsLoadingProjects(false);
    //     });
    // }, []);

    const fetchGitHubRepos = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/yorramn/repos`, {
                headers: {
                    Authorization: "Bearer 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"
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching repos:', error);
            throw error; // Propaga o erro para ser tratado no useEffect
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
            emailjs.init('nnv44NWLMjbKHD01j');
            console.log(process.env.EMAILJS_PUBLIC_KEY)
            await emailjs.send(
                'service_33xj1o7', // ID do Service (obtido no EmailJS)
                'template_ao8fmjx', // ID do Template (obtido no EmailJS)
                {
                    to_name: 'Gabriel Yorramn',
                    from_name: formData.name,
                    message:
                        `
                            Nome do Cliente: ${formData.name}\n
                            Email do Cliente: ${formData.email}\n
                            Telefone do Cliente: ${formData.phone}\n
                            \n
                            Mensagem: ${formData.message}
                        `,
                    to_email: 'bielyorramn@gmail.com',
                    reply_to: formData.email,
                }
            );

            toast({
                title: "Mensagem enviada!",
                description: "Obrigado pelo contato. Retornaremos em breve.",
            });

            setFormData({name: "", email: "", phone: "", message: ""});

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

    const activeHref = window.location.href.trim().split('#')[1]

    const navigation = [
        { name: 'Sobre', href: '#sobre', current: true },
        { name: 'Projetos', href: '#projetos', current: false },
        { name: 'Tecnologias', href: '#tecnologias', current: false },
        { name: 'Contato', href: '#contato', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        if (value) {
            const element = document.querySelector(value);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            // Reset select after navigation
            setTimeout(() => setSelectedOption(''), 500);
        }
    };

    const menuItems = [
        { href: "#sobre", label: "Sobre" },
        { href: "#projetos", label: "Projetos" },
        { href: "#tecnologias", label: "Tecnologias" },
        { href: "#companies", label: "Cases" },
        { href: "#services", label: "Serviços" },
        { href: "#budget", label: "Como funciona" },
        { href: "#testimonials", label: "Relatos" },
        { href: "#contato", label: "Contato" }
    ];

    const dropdownItems = [
        { href: "#projetos", label: "Projetos" },
        { href: "#tecnologias", label: "Tecnologias" },
        { href: "#companies", label: "Cases" },
        { href: "#services", label: "Serviços" }
    ];

    const handleNavClick = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav/>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20" id="home">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Desenvolvedor
                                <span className="block text-orange-500">Full Stack</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                A solução que seu projeto precisa, com a empresa que você <b>confia</b>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    onClick={openWhatsApp}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5"/>
                                    Solicitar Orçamento
                                </Button>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <div
                                className="w-64 h-64 rounded-full overflow-hidden border-4 border-orange-500 shadow-2xl">
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
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-3 mb-6">
                            Um pouco sobre minha trajetória, experiências e um pouco sobre <span className="text-orange-500">Yorramn</span>!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-baseline text-justify">
                        <div>
                            <div className="flex items-center mb-6">
                            <User className="h-8 w-8 text-orange-500 mr-3"/>
                                <h3 className="text-2xl font-bold text-gray-800">Quem Sou</h3>
                            </div>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Pratico esportes nas horas vagas e entusiasta da programação, fissurado por aprender
                                    e ensinar,
                                    busco compartilhar meu conhecimento e contribuir em projetos OpenSource e privados,
                                    como de empresas, de forma clara e objetiva na resolução e entrega escaláveis e
                                    personalizadas.
                                </p>
                                <p>
                                    Analista e Desenvolvedor de Sistemas, focado no Desenvolvimento Web FullStack Pleno,
                                    Líder Técnico e aspirante a palestrante, decidido a me desenvolver na área e focar
                                    toda
                                    experiência obtida com projetos, em vias de alternativa para soluções ágeis.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center mb-6">
                                <Briefcase className="h-8 w-8 text-orange-500 mr-3"/>
                                <h3 className="text-2xl font-bold text-gray-800">Experiência</h3>
                            </div>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Atuo na área do desenvolvimento de aplicações escaláveis e de alta
                                    complexidade <span className="text-orange-500">há 3 anos</span>, sempre entregando
                                    soluções inteligentes e necessárias para meus clientes.
                                </p>
                                <p>
                                    Nem sempre o que nos ofertam, é o que precisamos. Não é mesmo? Partindo deste
                                    princípio, não me prendo a tecnologias ou ferramentas, mas sim, ao problema a ser
                                    resolvido, dentro do quê é necessário para você.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projetos" className="py-20 bg-gray-900">
                <div className="max-w-6xl mx-auto px-6">
                    <div
                        className="relative isolate overflow-hidden bg-gray-800 px-6 pt-16 rounded-3xl after:pointer-events-none after:absolute after:inset-0 after:ring-2 after:ring-white/10 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        {/* Background Gradient */}
                        <svg
                            viewBox="0 0 1024 1024"
                            aria-hidden="true"
                            className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        >
                            <circle r={512} cx={512} cy={512} fill="url(#gradient)" fillOpacity="0.7"/>
                            <defs>
                                <radialGradient id="gradient">
                                    <stop stopColor="#EA580C"/>
                                    <stop offset={1} stopColor="#DC2626"/>
                                </radialGradient>
                            </defs>
                        </svg>

                        {/* Content */}
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start mb-6">
                                <FolderOpen className="h-8 w-8 text-orange-500 mr-3"/>
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Projetos Incríveis
                                </h2>
                            </div>

                            <h3 className="text-2xl font-semibold text-balance text-white mb-4">
                                Em breve, uma galeria dos meus melhores trabalhos
                            </h3>

                            <p className="mt-4 text-justify text-lg text-pretty text-gray-300 leading-relaxed">
                                Estou preparando uma seleção especial dos projetos mais relevantes que desenvolvi.
                                Cada caso representa uma solução única, com tecnologias modernas e foco em resultados.
                            </p>

                            <div className="mt-8 space-y-4 text-gray-300">
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-orange-500 mr-3"/>
                                    <span>Projetos completos com stack tecnológica</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-orange-500 mr-3"/>
                                    <span>Cases de sucesso e métricas reais</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-orange-500 mr-3"/>
                                    <span>Detalhes técnicos e processo de desenvolvimento</span>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <button
                                    onClick={openWhatsApp}
                                    className="flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5"/>
                                    Solicitar Orçamento
                                </button>
                                <a
                                    href="#contato"
                                    className="text-sm font-semibold text-white hover:text-orange-300 transition-colors duration-200"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector('#contato')?.scrollIntoView({behavior: 'smooth'});
                                    }}
                                >
                                    Ver disponibilidade
                                    <span aria-hidden="true" className="ml-1">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Preview Image */}
                        <div className="relative mt-16 h-64 lg:mt-8 lg:h-80 lg:flex-1">
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <FolderOpen className="h-16 w-16 mx-auto mb-4 text-orange-500"/>
                                    <p className="text-lg font-semibold">Galeria em Construção</p>
                                    <p className="text-sm mt-2">Novos projetos chegando em breve</p>
                                </div>
                            </div>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-gray-800 rounded-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/*/!* Projects Section *!/*/}
            {/*<section id="projetos" className="py-20 bg-gray-50">*/}
            {/*    <div className="max-w-6xl mx-auto px-6">*/}
            {/*        <div className="text-center mb-12">*/}
            {/*            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">*/}
            {/*                Projetos em Destaque*/}
            {/*            </h2>*/}
            {/*            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>*/}
            {/*        </div>*/}

            {/*        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">*/}
            {/*            {isLoadingProjects ? (*/}
            {/*                <div className="col-span-full">*/}
            {/*                    <LoadingSpinner size="lg" text="Carregando projetos do GitHub..."/>*/}
            {/*                </div>*/}
            {/*            ) : projects.length > 0 ? (*/}
            {/*                projects.map((project, index) => (*/}
            {/*                    <Card key={index}*/}
            {/*                          className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">*/}
            {/*                        <CardHeader>*/}
            {/*                            <div className="flex justify-between items-start">*/}
            {/*                                <CardTitle className="text-xl font-bold text-gray-800">*/}
            {/*                                    {project.name}*/}
            {/*                                </CardTitle>*/}
            {/*                                <div className="flex gap-2">*/}
            {/*                                    {project.githubUrl && (*/}
            {/*                                        <a href={project.githubUrl} target="_blank"*/}
            {/*                                           rel="noopener noreferrer">*/}
            {/*                                            <Button variant="ghost" size="sm" className="p-2">*/}
            {/*                                                <Github className="h-4 w-4 text-gray-600"/>*/}
            {/*                                            </Button>*/}
            {/*                                        </a>*/}
            {/*                                    )}*/}
            {/*                                    {project.liveUrl && (*/}
            {/*                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">*/}
            {/*                                            <Button variant="ghost" size="sm" className="p-2">*/}
            {/*                                                <ExternalLink className="h-4 w-4 text-gray-600"/>*/}
            {/*                                            </Button>*/}
            {/*                                        </a>*/}
            {/*                                    )}*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <CardDescription className="text-gray-600">*/}
            {/*                                {project.description}*/}
            {/*                            </CardDescription>*/}
            {/*                            {(project.stars > 0 || project.forks > 0) && (*/}
            {/*                                <div className="flex gap-4 text-sm text-gray-500">*/}
            {/*                                    {project.stars > 0 && (*/}
            {/*                                        <div className="flex items-center gap-1">*/}
            {/*                                            <Star className="h-3 w-3"/>*/}
            {/*                                            <span>{project.stars}</span>*/}
            {/*                                        </div>*/}
            {/*                                    )}*/}
            {/*                                    {project.forks > 0 && (*/}
            {/*                                        <div className="flex items-center gap-1">*/}
            {/*                                            <Github className="h-3 w-3"/>*/}
            {/*                                            <span>{project.forks}</span>*/}
            {/*                                        </div>*/}
            {/*                                    )}*/}
            {/*                                </div>*/}
            {/*                            )}*/}
            {/*                        </CardHeader>*/}
            {/*                        <CardContent>*/}
            {/*                            <div className="flex flex-wrap gap-2">*/}
            {/*                                {project.technologies.map((tech, techIndex) => (*/}
            {/*                                    <Badge*/}
            {/*                                        key={techIndex}*/}
            {/*                                        variant="secondary"*/}
            {/*                                        className="bg-gray-200 text-gray-700 hover:bg-orange-100"*/}
            {/*                                    >*/}
            {/*                                        {tech}*/}
            {/*                                    </Badge>*/}
            {/*                                ))}*/}
            {/*                            </div>*/}
            {/*                        </CardContent>*/}
            {/*                    </Card>*/}
            {/*                ))*/}
            {/*            ) : (*/}
            {/*                <div className="col-span-full text-center py-8">*/}
            {/*                    <p className="text-gray-600">Nenhum projeto encontrado.</p>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Technologies Section */}
            <section id="tecnologias" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Tecnologias & Ferramentas
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                            Domínio completo do ecossistema de desenvolvimento moderno
                        </p>
                        <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
                    </div>

                    <div
                        className="relative isolate overflow-hidden bg-white/80 backdrop-blur-sm px-8 py-12 rounded-3xl shadow-lg border border-white/20">
                        {/* Background Gradient */}
                        <svg
                            viewBox="0 0 1024 1024"
                            aria-hidden="true"
                            className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] opacity-50"
                        >
                            <circle r={512} cx={512} cy={512} fill="url(#tech-gradient)" fillOpacity="0.6"/>
                            <defs>
                                <radialGradient id="tech-gradient">
                                    <stop stopColor="#3B82F6"/>
                                    <stop offset={1} stopColor="#10B981"/>
                                </radialGradient>
                            </defs>
                        </svg>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {/* Backend */}
                            <div className="group text-center">
                                <div className="relative">
                                    <div
                                        className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                                        <Code className="h-16 w-16 text-white"/>
                                    </div>
                                    <div
                                        className="absolute -inset-4 bg-orange-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Backend</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {mockData.technologies.backend.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/80 backdrop-blur-sm border border-orange-200 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                {tech}
                            </span>
                                    ))}
                                </div>
                            </div>

                            {/* Frontend */}
                            <div className="group text-center">
                                <div className="relative">
                                    <div
                                        className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                                        <Globe className="h-16 w-16 text-white"/>
                                    </div>
                                    <div
                                        className="absolute -inset-4 bg-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Frontend</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {mockData.technologies.frontend.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                {tech}
                            </span>
                                    ))}
                                </div>
                            </div>

                            {/* Dados */}
                            <div className="group text-center">
                                <div className="relative">
                                    <div
                                        className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                                        <Database className="h-16 w-16 text-white"/>
                                    </div>
                                    <div
                                        className="absolute -inset-4 bg-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Dados</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {mockData.technologies.database.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/80 backdrop-blur-sm border border-green-200 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                {tech}
                            </span>
                                    ))}
                                </div>
                            </div>

                            {/* Ferramentas */}
                            <div className="group text-center">
                                <div className="relative">
                                    <div
                                        className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                                        <Cpu className="h-16 w-16 text-white"/>
                                    </div>
                                    <div
                                        className="absolute -inset-4 bg-purple-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Ferramentas</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {mockData.technologies.tools.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                {tech}
                            </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="text-center mt-12 pt-8 border-t border-gray-200/50">
                            <p className="text-gray-600 text-sm">
                                + outras tecnologias e frameworks especializados
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Companies Section */}
            <section id="companies" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Empresas que confiam no <span className="text-orange-500">Nosso Serviço</span>
                        </h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Parcerias sólidas construídas através de resultados excepcionais e confiança mútua
                        </p>
                    </div>

                    {/* Trust Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
                            <div className="text-gray-600">Empresas Atendidas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
                            <div className="text-gray-600">Projetos Entregues</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                            <div className="text-gray-600">Satisfação</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-2">3+</div>
                            <div className="text-gray-600">Anos Experiência</div>
                        </div>
                    </div>

                    {/* Companies Carousel */}
                    <div className="relative">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {companies.map((company) => (
                                    <div key={company.id}
                                         className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                                        <Card
                                            className="h-full mx-2 hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
                                            <CardContent className="p-6">
                                                {/* Logo and Header */}
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div
                                                        className={`w-16 h-16 bg-gradient-to-br ${company.gradient} rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                                                        {company.logo}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                                                        <p className="text-orange-600 font-medium">{company.title}</p>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                                    {company.description}
                                                </p>

                                                {/* Metrics and Duration */}
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="h-4 w-4 text-green-500"/>
                                                        <span
                                                            className="text-sm font-semibold text-green-600">{company.metrics}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{company.duration}</span>
                                                </div>

                                                {/* Testimonial */}
                                                <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-orange-500">
                                                    <p className="text-sm text-gray-700 italic">"{company.testimonial}"</p>
                                                </div>

                                                {/* Trust Badge */}
                                                <div className="flex items-center justify-center mt-4">
                                                    <div
                                                        className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                                                        <Shield className="h-4 w-4 text-green-600"/>
                                                        <span className="text-xs font-medium text-green-700">Projeto Concluído</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex justify-center gap-4 mt-8">
                            <Button
                                onClick={scrollPrev}
                                disabled={prevBtnDisabled}
                                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full p-0 shadow-lg"
                                aria-label="Empresa anterior"
                            >
                                <ChevronLeft className="h-6 w-6"/>
                            </Button>

                            <Button
                                onClick={scrollNext}
                                disabled={nextBtnDisabled}
                                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full p-0 shadow-lg"
                                aria-label="Próxima empresa"
                            >
                                <ChevronRight className="h-6 w-6"/>
                            </Button>
                        </div>

                        {/* Auto-play indicator */}
                        <div className="text-center mt-4">
                            <p className="text-xs text-gray-500">
                                <Building2 className="inline h-3 w-3 mr-1"/>
                                Deslize para ver mais empresas parceiras
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Serviços Oferecidos
                        </h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Soluções completas em desenvolvimento e gestão de projetos com foco em <span
                            className="text-orange-500">qualidade e
                            resultados</span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Code className="h-8 w-8 text-orange-600"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Desenvolvimento</h3>
                                <p className="text-gray-600 text-justify">
                                    Desenvolvimento de aplicações web e multiplataforma completas, utilizando as
                                    melhores tecnologias do
                                    mercado como PHP, Laravel, JavaScript, Angular, bancos de dados robustos e quais
                                    mais <span className="text-orange-500">você precisar</span>.
                                </p>
                            </CardContent>
                            <CardFooter className="text-center flex justify-center">
                                <Button
                                    onClick={openWhatsApp}
                                    className="bg-orange-600 hover:bg-orange-700 mt-4 text-white rounded-lg font-semibold text-lg"
                                >
                                    <MessageCircle className="mr-2 h-6 w-6"/>
                                    Solicitar orçamento gratuito
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Users className="h-8 w-8 text-blue-600"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Liderança Técnica</h3>
                                <p className="text-gray-600 text-justify">
                                    Liderança de equipes de desenvolvimento, definição de arquiteturas e implementação
                                    de boas práticas para garantir a qualidade do código, além de mentoria em decisões
                                    estruturais em projetos já existentes.
                                </p>
                            </CardContent>
                            <CardFooter className="text-center flex justify-center">
                                <Button
                                    onClick={openWhatsApp}
                                    className="bg-orange-600 hover:bg-orange-700 mt-4 text-white rounded-lg font-semibold text-lg"
                                >
                                    <MessageCircle className="mr-2 h-6 w-6"/>
                                    Solicitar orçamento gratuito
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Settings className="h-8 w-8 text-green-600"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Micro Projetos</h3>
                                <p className="text-gray-600 text-justify">
                                    Desenvolvimento rápido de funcionalidades específicas, APIs, integrações e soluções
                                    pontuais com foco em agilidade e eficiência. Ideal para demandas que exigem mais
                                    agilidade, ex: <span className="text-orange-500">Wordpress e CMS's</span> no geral.
                                </p>
                            </CardContent>
                            <CardFooter className="text-center flex justify-center">
                                <Button
                                    onClick={openWhatsApp}
                                    className="bg-orange-600 hover:bg-orange-700 mt-4 text-white rounded-lg font-semibold text-lg"
                                >
                                    <MessageCircle className="mr-2 h-6 w-6"/>
                                    Solicitar orçamento gratuito
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-purple-600"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Análise de Requisitos</h3>
                                <p className="text-gray-600 text-justify">
                                    Levantamento detalhado de necessidades, documentação técnica e definição de escopo
                                    para garantir o sucesso do projeto.
                                </p>
                            </CardContent>
                            <CardFooter className="text-center flex justify-center">
                                <Button
                                    onClick={openWhatsApp}
                                    className="bg-orange-600 hover:bg-orange-700 mt-4 text-white rounded-lg font-semibold text-lg"
                                >
                                    <MessageCircle className="mr-2 h-6 w-6"/>
                                    Solicitar orçamento gratuito
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Calendar className="h-8 w-8 text-yellow-600"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Gestão KANBAN - SPRINT</h3>
                                <p className="text-gray-600 text-justify">
                                    Implementação e gestão de metodologias ágeis, organização de sprints e
                                    acompanhamento de progresso usando ferramentas modernas.
                                </p>
                            </CardContent>
                            <CardFooter className="text-center flex justify-center">
                                <Button
                                    onClick={openWhatsApp}
                                    className="bg-orange-600 hover:bg-orange-700 mt-4 text-white rounded-lg font-semibold text-lg"
                                >
                                    <MessageCircle className="mr-2 h-6 w-6"/>
                                    Solicitar orçamento gratuito
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Layers className="h-8 w-8 text-red-600"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Projetos de Alta Complexidade</h3>
                                <p className="text-gray-600 text-justify">
                                    Desenvolvimento de sistemas enterprise, arquiteturas escaláveis e soluções robustas
                                    para grandes volumes de dados e usuários.
                                </p>
                            </CardContent>
                            <CardFooter className="text-center flex justify-center">
                                <Button
                                    onClick={openWhatsApp}
                                    className="bg-orange-600 hover:bg-orange-700 mt-4 text-white rounded-lg font-semibold text-lg"
                                >
                                    <MessageCircle className="mr-2 h-6 w-6"/>
                                    Solicitar orçamento gratuito
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="budget" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Como funciona o <span className="text-orange-500">desenvolvimento</span>
                        </h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Um processo transparente e organizado para garantir que seu projeto seja desenvolvido com
                            excelência
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md relative">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        1
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <MessageSquare className="h-5 w-5 text-orange-600"/>
                                            <h3 className="text-lg font-bold text-gray-800">Reunião Inicial</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Conversamos sobre suas necessidades, objetivos do projeto e expectativas.
                                            Esta etapa é inteiramente necessária para entender quais serão as
                                            necessidades do projeto.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 2 */}
                        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        2
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="h-5 w-5 text-blue-600"/>
                                            <h3 className="text-lg font-bold text-gray-800">Alinhamento Técnico</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Definimos tecnologias, cronograma, valores e metodologia. Você recebe uma
                                            proposta detalhada e transparente.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 3 */}
                        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        3
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Code className="h-5 w-5 text-green-600"/>
                                            <h3 className="text-lg font-bold text-gray-800">Desenvolvimento</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Início do desenvolvimento seguindo as melhores práticas, com acompanhamento
                                            constante e testes rigorosos.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 4 */}
                        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        4
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="h-5 w-5 text-purple-600"/>
                                            <h3 className="text-lg font-bold text-gray-800">Validação</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Você testa e valida todas as funcionalidades. Se necessário, fazemos ajustes
                                            e melhorias sem custos adicionais.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 5 */}
                        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        5
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="h-5 w-5 text-indigo-600"/>
                                            <h3 className="text-lg font-bold text-gray-800">Entrega Final</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Entrega do projeto completo com documentação, treinamento se necessário e
                                            coleta de feedback para futuras melhorias.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 6 - Extra */}
                        <Card
                            className="hover:shadow-lg transition-all duration-300 border-0 shadow-md border-2 border-orange-200">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                                        <Wrench className="h-6 w-6"/>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="h-5 w-5 text-orange-600"/>
                                            <h3 className="text-lg font-bold text-gray-800">Manutenção</h3>
                                            <Badge className="bg-orange-100 text-orange-800 text-xs">Extra</Badge>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Oferecemos serviços de manutenção e suporte contínuo com valores
                                            competitivos e atendimento prioritário.
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
                            <MessageCircle className="mr-2 h-6 w-6"/>
                            Solicitar Orçamento Gratuito
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gray-900 text-white">
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
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current"/>
                                        ))}
                                    </div>
                                    <blockquote className="text-gray-300 mb-4 italic">
                                        "{testimonial.content}"
                                    </blockquote>
                                    <div className="flex items-center">
                                        <div
                                            className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                                    <p className="text-gray-400 italic">Descreva brevemente alguns detalhes sobre seu
                                        projeto</p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmittingForm}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
                                >
                                    {isSubmittingForm ? (
                                        <>
                                            <div
                                                className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="mr-2 h-5 w-5"/>
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
                                    <Github className="h-5 w-5"/>
                                </Button>
                                <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-600">
                                    <Linkedin className="h-5 w-5"/>
                                </Button>
                                <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-600">
                                    <Mail className="h-5 w-5"/>
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
                                    <Mail className="h-4 w-4 mr-2"/>
                                    yorramn.dev@gmail.com
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2"/>
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
                className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full animate-pulse shadow-lg transition-all duration-300 hover:scale-110 z-50"
                aria-label="Contato via WhatsApp"
            >
                <MessageCircle className="h-6 w-6"/>
            </button>

            <Toaster/>
        </div>
    );
};

export default Portfolio;