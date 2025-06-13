import React, { useState, useEffect} from "react";
import {getFullHistory, getStoragePref} from '../../utils/storage';
import LoginPrompt from "../prompts/LoginPrompt";
import {Trophy, X, MinusIcon} from "lucide-react";
import { games} from "../../config/games";


interface GameHistory{
    gameId: string;
    history: {
        date: string;
        result: 'win' | 'loss' | 'draw' ;
        opponents?: string[];
    };
}

interface HistoryViewProp{
    onStorageChange?: () => void;
}


export const  HistoryView: React.FC<HistoryViewProp> = ({ onStorageChange }) => {
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [history, setHistory] = useState<GameHistory[] | null>(null);
    const storagePref = getStoragePref();

    useEffect(() =>{
        if(storagePref === undefined){
            setStorageLoginPrompt(true);
        }else{
            setHistory(getFullHistory());
        }
    },[storagePref]);

    const refreshHistory = () => {
        setHistory(getFullHistory());
    };

    const getGameTitle = (gameId: string): string => {
        const game = games.find(g => g.id === gameId);
        return game ? game.title : gameId ;
    };

    const getResultIcon = (result: 'win' | 'loss' | 'draw') => {
        switch (result){
            case "win":
                return <Trophy className="w-5 h-5 text-[#F28f8f]" />
            case "loss":
                return <X className="w-5 h-5 text-red-500" />
            case "draw":
                return <MinusIcon className="w-5 h-5 text-gray-500" />
        }
    };

    const formatdate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US',{
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {
                showLoginPrompt && (
                    <LoginPrompt
                        onClose={() =>{
                            setShowLoginPrompt(false);
                            refreshHistory();
                        }}
                        onSotrageSet={() => {
                            onStorageChange?.();
                            refreshHistory();
                        }}
                    />
                )
            }

            <h1 className="text-2xl font-bold mb-6">Game History</h1>

            {
                history && (history.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-600">No Game History Yet</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Play some Games to Have them show up here :)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {
                            history.map(({gameId, history: entry}, index) =>(
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium">{getGameTitle(gameId)}</h3>
                                        <p className="text-sm text-gray-500">
                                            {formatdate(entry.date)}
                                        </p>
                                        {entry.opponents && entry.opponents.length > 0 && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                vs {entry.opponents.join(', ')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getResultIcon(entry.result)}
                                        <span className="text-sm font-medium capitalize">
                                            {entry.result}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default HistoryView;