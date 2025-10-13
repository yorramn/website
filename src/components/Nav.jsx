import { useState, useRef, useEffect } from 'react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpenDesktop, setIsDropdownOpenDesktop] = useState(false);
    const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const dropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);

    const handleNavClick = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
        setIsDropdownOpenDesktop(false);
        setIsDropdownOpenMobile(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpenDesktop(false);
                setTooltipVisible(false);
            }
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
                setIsDropdownOpenMobile(false);
            }
            if (isMenuOpen && !event.target.closest('nav')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const dropdownItems = [
        { href: "#projetos", label: "Projetos", disabled: true },
        { href: "#tecnologias", label: "Tecnologias", disabled: false },
        { href: "#companies", label: "Cases", disabled: false },
        { href: "#services", label: "Serviços", disabled: false }
    ];

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <nav className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        Yorramn
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-8 items-center">
                        <a
                            href="#home"
                            className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#home');
                            }}
                        >
                            Home
                        </a>
                        <a
                            href="#sobre"
                            className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#sobre');
                            }}
                        >
                            Sobre
                        </a>

                        {/* Dropdown Personalizado para Desktop */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200 focus:outline-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDropdownOpenDesktop(!isDropdownOpenDesktop);
                                }}
                            >
                                <span>Mais</span>
                                <svg
                                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDropdownOpenDesktop ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu Desktop */}
                            {isDropdownOpenDesktop && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                    {dropdownItems.map((item) => (
                                        <div
                                            key={item.href}
                                            className="relative"
                                            onMouseEnter={() => item.disabled && setTooltipVisible(true)}
                                            onMouseLeave={() => setTooltipVisible(false)}
                                        >
                                            <a
                                                href={item.href}
                                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                                    item.disabled
                                                        ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                                                        : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!item.disabled) {
                                                        handleNavClick(item.href);
                                                        setIsDropdownOpenDesktop(false);
                                                    }
                                                }}
                                            >
                                                {item.label}
                                            </a>

                                            {/* Tooltip para Projetos */}
                                            {item.disabled && tooltipVisible && (
                                                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 z-50">
                                                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                                        Em breve, exibição dos melhores projetos
                                                        {/* Seta do tooltip */}
                                                        <div className="absolute right-full top-1/2 transform -translate-y-1/2">
                                                            <div className="border-4 border-transparent border-r-gray-900"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <a
                            href="#budget"
                            className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#budget');
                            }}
                        >
                            Como funciona
                        </a>
                        <a
                            href="#testimonials"
                            className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#testimonials');
                            }}
                        >
                            Relatos
                        </a>
                        <a
                            href="#contato"
                            className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#contato');
                            }}
                        >
                            Contato
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-3 pt-4">
                            <a
                                href="#home"
                                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#home');
                                }}
                            >
                                Home
                            </a>
                            <a
                                href="#sobre"
                                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#sobre');
                                }}
                            >
                                Sobre
                            </a>

                            {/* Dropdown para Mobile */}
                            <div className="space-y-1" ref={mobileDropdownRef}>
                                <button
                                    className="flex items-center justify-between w-full text-gray-600 hover:text-orange-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDropdownOpenMobile(!isDropdownOpenMobile);
                                    }}
                                >
                                    <span>Mais opções</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpenMobile ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu Mobile */}
                                {isDropdownOpenMobile && (
                                    <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-3">
                                        {dropdownItems.map((item) => (
                                            <div
                                                key={item.href}
                                                className="relative"
                                            >
                                                <a
                                                    href={item.href}
                                                    className={`block py-2 px-3 rounded-lg transition-colors duration-200 text-sm ${
                                                        item.disabled
                                                            ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                                                            : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (!item.disabled) {
                                                            handleNavClick(item.href);
                                                        }
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{item.label}</span>
                                                        {item.disabled && (
                                                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded ml-2">
                                                                Em breve
                                                            </span>
                                                        )}
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <a
                                href="#budget"
                                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#budget');
                                }}
                            >
                                Como funciona
                            </a>
                            <a
                                href="#testimonials"
                                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#testimonials');
                                }}
                            >
                                Relatos
                            </a>
                            <a
                                href="#contato"
                                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#contato');
                                }}
                            >
                                Contato
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navigation;