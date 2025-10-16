import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Mostrar/ocultar botão baseado no scroll
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Função para scroll suave ao topo
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
                    aria-label="Voltar ao topo"
                >
                    {/* Ícone com animação */}
                    <ChevronUp className="h-6 w-6 transform group-hover:-translate-y-1 transition-transform duration-300" />

                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                    {/* Tooltip sutil */}
                    <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Voltar ao topo
                        {/* Seta do tooltip */}
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                            <div className="border-4 border-transparent border-l-gray-900"></div>
                        </div>
                    </div>
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;