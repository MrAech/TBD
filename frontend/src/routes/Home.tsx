import {useState, useEffect} from 'react';
import {Home, Gift, Clock, Menu, User} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import GamesView from "../components/views/GamesView";
import GiftView from "../components/views/GiftView";
import HistoryView from "../components/views/HistoryView";
import MenuDropdown from "../components/MenuDropdown";
import LoginPrompt from "../components/prompts/LoginPrompt";
import {resetStroragePref, getStoragePref} from '../utils/storage'

interface NavIconProp{
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavIcon = ({ icon: Icon, label, isActive, onClick }: NavIconProp) => (
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
   const [activePage, setactivePage] = useState('home');
   const [intendedPage, setIntendedPage] = useState<string | null>(null);
   const [showMenu, setShowMenu] = useState(false);
   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
   const [hasStoragePref, setHasStoragePref] = useState(
       getStoragePref() ! == undefined
   );

   const updateStoragePref = () =>{
       setHasStoragePref(getStoragePref() !== undefined);
   };

    useEffect(() => {
        updateStoragePref();
        window.addEventListener('storage', updateStoragePref);
        return () => window.removeEventListener('storage', updateStoragePref);
    }, []);

    const handleReset = () =>{
        resetStroragePref();
        setHasStoragePref(false);
        setactivePage('home');
        setIntendedPage(null);
    };

    const handlePageChange =(page: string) =>{
        if(page ==='home'){
            setShowLoginPrompt(false);
            setIntendedPage(null);
            setactivePage('home');
            return;
        }

        if((page === 'gift' || page === 'time') && !hasStoragePref){
            setIntendedPage(page);
            setShowLoginPrompt(true);
            return;
        }

        setactivePage(page);
        setIntendedPage(null);
    };

    const handleLoginClose = () =>{
        setShowLoginPrompt(false);
        setIntendedPage(null);
    }

    const handlgeLoginSuccess = () => {
        setShowLoginPrompt(false);
        updateStoragePref();
        if(intendedPage){
            setactivePage(intendedPage);
            setIntendedPage(null);
        }
    };

    const navItems: Array<{label: string; icon: LucideIcon}> =[
        {label: 'home', icon: Home},
        {label: 'gift', icon: Gift},
        {label: 'time', icon: Clock},
    ];

    const renderContent = () =>{
        switch (activePage){
            case 'gift':
                return hasStoragePref ? <GiftView onStorageChange={updateStoragePref}/> : null;
            case 'time':
                return hasStoragePref ? <HistoryView onStorageChange={updateStoragePref}/> : null;
            default:
                return <GamesView />;
        }
    };


    return (
        <>
            <div className="flex flex-col min-h-screen bg-blue-100 items-center w-full">
                {/* NavBar */}
                <div
                    className="sticky top-0 w-full shadow-md z-50"
                    style={{ backgroundColor: "#F28f8f" }}
                >
                    <div className="flex w-full px-4 py-3 items-center justify-between">
                        {/* Left: profile icon */}
                        <div className="flex-none">
                            <button
                                aria-label="Profile"
                                className="text-black p-2 rounded-full shadow-md"
                            >
                                <User className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Center: Main Nav icons */}
                        <div className="flex-1 flex justify-center items-center gap-6">
                            {navItems.map(({ label, icon }) => (
                                <NavIcon
                                    key={label}
                                    icon={icon}
                                    label={label}
                                    isActive={
                                        showLoginPrompt
                                            ? intendedPage === label
                                            : activePage === label
                                    }
                                    onClick={() => handlePageChange(label)}
                                />
                            ))}
                        </div>

                        {/* Right: Menu icon */}
                        <div className="flex-none relative">
                            <button
                                className="text-black p-2"
                                aria-label="Menu"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            {/* Only show reset option if storage preference is set */}
                            {showMenu && hasStoragePref && (
                                <MenuDropdown
                                    onReset={handleReset}
                                    onClose={() => setShowMenu(false)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-full flex-grow">
                    {renderContent()}
                </div>
            </div>

            {/* Login Prompt Overlay */}
            {showLoginPrompt && (
                <div className="fixed inset-0 z-40 pointer-events-none">
                    <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-auto" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                        <LoginPrompt
                            onClose={handleLoginClose}
                            onStorageSet={handlgeLoginSuccess}
                        />
                    </div>
                </div>
            )}
        </>
    );
}