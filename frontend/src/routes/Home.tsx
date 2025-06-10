import {useState, useEffect} from 'react';
import {Home, Gift, Clock, Menu, User} from 'lucide-react';
import {useAnimation} from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    namePlaceThumbnail,
    rajaRaniThumbnail,
    ticTacToeThumbnail,
} from '../assets/assets.ts';
import GameCard from '../components/GameCard.tsx';

// todo: Add More Games and make it dynamic will try to Integrate with DB later
const games = [
    {
        title: "Name, Place, Animal and Object",
        playerCount: "2< players",
        image: namePlaceThumbnail
    },
    {
        title: "Raja, Rani, Bajer and Choor",
        playerCount: "3< players",
        image: rajaRaniThumbnail
    },
    {
        title: "Tic Tac Toe",
        playerCount: "2 players",
        image: ticTacToeThumbnail
    }
];



interface NaveIconProp{
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavIcon = ({ icon: Icon, label, isActive, onClick}: NaveIconProp) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center p-3 rounded-md transition-colors duration-300
        ${isActive ? "bg-[#FFE2E2]" : "bg-transparent"}
        hover:bg-[#FFE2E2] border-0`}
        aria-label={label}
    >
        <Icon className="w-6 h-6 text-black" />
    </button>
);

export default function GameMenu() {
    const [activePage, setActivePage] = useState('home');
    const animationControls = useAnimation();

    useEffect(() => {
        animationControls.start({
            y:[0, -5, 0],
            transition: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
            },
        });
    }, [animationControls]);

    const navItems: Array<{ label: string; icon: LucideIcon}> = [
        {label: "home", icon: Home},
        {label: "gift", icon: Gift},
        {label: "time", icon: Clock},
    ];

    return (
        <div className="flex flex-col min-h-screen bg-blue-100 items-center w-full">
            {/* NavBar */}
            <div
                className="sticky top-0 w-full shadow-md z-10"
                style={{backgroundColor: "#F28f8f"}}
            >
                <div className="flex w-full px-4 py-3  items-center justify-between">
                    {/* Left: profile icon */}
                    <div className="flex-none">
                        <button
                            aria-label="Profile"
                            className="text-black p-2 rounded-full shadow-md"
                        >
                            <User className="w-6 h-6"/>
                        </button>
                    </div>

                    {/*Center: Main Mav icon for That Page Only */}
                    <div className="flex-1 flex justify-center items-center gap-6">
                        {
                            navItems.map(({ label, icon }) => (
                                <NavIcon
                                    key={label}
                                    icon={icon}
                                    label={label}
                                    isActive={activePage === label}
                                    onClick={() => setActivePage(label)}
                                />
                            ))}
                    </div>

                    {/* Right: Menu icon */}
                    <div className="flex-none">
                        <button className="text-black p-2" aria-label="Menu">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/*Game Grid*/}
            <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl place-items-center">
                    {
                        games.map((game) => (
                            <GameCard
                                key={game.title}
                                {...game}
                                animationControls={animationControls}
                                // todo: Add Redirects
                                onClick={() => alert(`You Selected: ${game.title}`)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

