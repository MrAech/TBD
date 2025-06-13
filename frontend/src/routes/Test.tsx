import {useState, useEffect} from 'react';
import { Gift, ArrowLeft, Skull } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


// Styles To Inject so dont put in a separate file
const styles = `
@keyframes fade-in {
    from { 
        opacity: 0; 
        transform: translateY(10px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}

@keyframes glow {
    0% {
        text-shadow: 0 0 5px #F28f8f, 0 0 10px #F28f8f;
    }
    50% {
        text-shadow: 0 0 20px #F28f8f, 0 0 25px #F28f8f;
    }
    100% {
        text-shadow: 0 0 5px #F28f8f, 0 0 10px #F28f8f;
    }
}

.animate-glow {
    animation: glow 2s ease-in-out infinite;
}
`;

export default function Test() {
    const [showSecret, setShowSecret] = useState(false);
    const [showSecondMessage, setShowSecondMessage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isFakeEe = location.pathname === '/e2';

    // Injecting Styles
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        return () => styleSheet.remove();
    }, []);

    useEffect(() => {
        if(showSecret && !isFakeEe){
            const timer = setTimeout(() => setShowSecondMessage(true), 100);
            return () => clearTimeout(timer);
        }
    }, [showSecret, isFakeEe]);

    if(isFakeEe){
        return(
            <div className="min-h-screen bg-gradient-to-br from-black to-[#F28f8f] flex items-center justify-center p-4 relative">
                {/* Back To Home Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 p-2 flex items-center gap-2 text-white hover:text-[#F28f8f] transition-colors z-10"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Wake up
                </button>

                <div className="bg-black/90 backdrop-blur-lg rounded-lg shadow-xl p-8 max-w-md text-center border border-[#F28f8f]">
                    <h1 className="text-[#F28f8f] text-2xl font-bold mb-4 animate-glow">
                        Did you Think it was that easy? : )
                    </h1>
                    <p className="text-[#F28f8f]/60 text-sm animate-fade-in">
                        Nice try... but you'll need to do better be more cleverer than this
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-[#F28f8f] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg[url(data:image/svg+xml;charset=utf-8,%3Csvg viewBox=%220 0 2 2%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M1 2V0h1v1H0v1z%22 fill=%22%23F28f8f22%22/%3E%3C/svg%3E)] opacity-20" />

            <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 p-2 flex items-center gap-2 text-white hover:text-[#F28f8f] transition-colors z-10"
            >
                <ArrowLeft className="w-5 h-5 " />
                Wake up Now
            </button>

            <div className="bg-black/90 backdrop-blur-lg rounded-lg shadow-xl p-8 max-w-md w-full text-center border border-[#F28f8f] relative z-10">
                <div
                    className="cursor-pointer mb-6 transition-transform duration-300 hover:scale-110"
                    onClick={() => !showSecret && setShowSecret(true)}
                >
                    {
                        !showSecret ? (
                            <Gift
                                className="w-16 h-16 mx-auto text-[#F28f8f] animate-bounce"
                            />
                        ) : (
                            <Skull
                                className="w-16 h-16 mx-auto text-[#F28f8f] animate-pulse"
                            />
                        )
                    }
                </div>
                {
                    !showSecret ? (
                        <h1 className="text-2xl font-bold mb-4 text-[#F28f8f] animate-glow">
                            What do we have here...?
                        </h1>
                    ) : (
                        <div className="space-y-6">
                            <div className="animate-fade-in">
                                <p className="text-2xl text-[#F28f8f] font-bold mb-2 animate-glow">
                                    Bow before me Mortal
                                </p>
                                <p className="text-xl text-[#F28f8f] italic">
                                    as it is I Aech - MrAech
                                </p>
                            </div>

                            {showSecondMessage && (
                                <div className="animate-fade-in p-4 border border-[#F28f8f] rounded-lg bg-black/50">
                                    <p className="text-[#F28f8f] text-lg">
                                        Took you long enough to figure it out...
                                    </p>
                                    <p className="text-[#F28f8f] mt-2 font-bold text-xl animate-glow">
                                        Now go find the rest
                                    </p>
                                    <div className="mt-4 text-xs text-[#F28f8f]/60">
                                        /e1 was just the beginning...
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
}