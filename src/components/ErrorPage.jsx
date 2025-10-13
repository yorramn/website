import { Home, ArrowLeft, AlertTriangle, Server } from 'lucide-react';

const ErrorPage = ({ statusCode = 404, errorMessage = "Página não encontrada" }) => {
    const is404 = statusCode === 404;
    const is500 = statusCode === 500;

    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6 py-12">
            <div className="max-w-2xl w-full">
                <div className="relative isolate overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">

                    {/* Content */}
                    <div className="text-center relative z-10">
                        {/* Icon */}
                        <div className="mb-8">
                            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-2xl ${
                                is404
                                    ? 'bg-gradient-to-br from-orange-500 to-red-500'
                                    : 'bg-gradient-to-br from-red-500 to-rose-500'
                            } shadow-lg mb-6`}>
                                {is404 ? (
                                    <AlertTriangle className="h-16 w-16 text-white" />
                                ) : (
                                    <Server className="h-16 w-16 text-white" />
                                )}
                            </div>
                        </div>

                        {/* Status Code */}
                        <div className="mb-6">
                            <h1 className="text-8xl font-bold bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {statusCode}
                            </h1>
                        </div>

                        {/* Message */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                {is404 ? 'Página não encontrada' : 'Erro interno do servidor'}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
                                {is404
                                    ? 'A página que você está procurando não existe ou foi movida.'
                                    : 'Algo deu errado no nosso servidor. Por favor, tente novamente mais tarde.'
                                }
                            </p>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8 max-w-md mx-auto">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                                <div className="text-left">
                                    <p className="text-orange-800 font-medium mb-1">
                                        {is404 ? 'O que pode ter acontecido?' : 'Estamos trabalhando nisso!'}
                                    </p>
                                    <p className="text-orange-700 text-sm">
                                        {is404
                                            ? 'Verifique o URL digitado ou use a navegação abaixo para voltar ao site.'
                                            : 'Nossa equipe já foi notificada e está corrigindo o problema.'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleGoBack}
                                className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Voltar
                            </button>

                            <button
                                onClick={handleGoHome}
                                className="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <Home className="h-5 w-5 mr-2" />
                                Página Inicial
                            </button>
                        </div>

                        {/* Support Link */}
                        <div className="mt-8 pt-6 border-t border-gray-200/50">
                            <p className="text-gray-600 text-sm">
                                Precisa de ajuda?{' '}
                                <button
                                    onClick={() => window.open('https://wa.me/SEUNUMERO', '_blank')}
                                    className="text-orange-600 hover:text-orange-700 font-medium underline transition-colors duration-200"
                                >
                                    Entre em contato
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Brand Footer */}
                <div className="text-center mt-8">
                    <div className="inline-flex items-center space-x-2 text-gray-500">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-semibold">Yorramn</span>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;