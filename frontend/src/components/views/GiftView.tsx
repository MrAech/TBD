import React, { useState, useEffect} from "react";
import {getTotalWins, getStorageData, getStoragePref} from '../../utils/storage';
import { Trophy } from 'lucide-react';
import LoginPrompt from '../prompts/LoginPrompt.tsx';
import {games} from '../../config/games';

interface GameStat{
    wins: number;
    history: Array<{
        date: string;
        result: 'win' | 'loss' | 'draw';
        opponents?: string[];
    }>;
}

interface GameStatMap{
    [gameId: string]: GameStat;
}

interface stats{
    totalWins: number;
    gamesStats: GameStatMap;
}

interface GiftViewProp{
    onStorageChange?: () => void;
}

export const GiftView: React.FC<GiftViewProp> = ({ onStorageChange}) => {
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [stats, setStats] = useState<stats | null>(null);

    const storagePref = getStoragePref();

    useEffect(() =>{
        if(storagePref === undefined){
            setShowLoginPrompt(true);
        }else{
            setStats({
                totalWins: getTotalWins(),
                gamesStats: getStorageData().gameStats
            });
        }
    }, [storagePref]);

    const refreshStats = () => {
        setStats({
            totalWins: getTotalWins(),
            gamesStats: getStorageData().gameStats
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {
                showLoginPrompt && (
                    <LoginPrompt
                        onClose={() => {
                            setShowLoginPrompt(false);
                            refreshStats();
                        }}
                        onStorageSet={() =>{
                            onStorageChange?.();
                            refreshStats();
                        }}
                    />
                )
            }

            {
                stats && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex items-center justify-center gap-4">
                            <Trophy className="w-8 h-8 text-[#F28f8f]" />
                            <h1 className="text-2xl font-bold">
                                Total Wins: {stats.totalWins}
                            </h1>
                        </div>
                    </div>
                )
            }

            {
                stats && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Wins By Game</h2>
                        {
                            games.map(game => (
                                <div
                                    key={game.id}
                                    className="bg-white rounded-lg shadow-md p-6"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium">{game.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-[#F28f8f]" />
                                            <span className="text-lg font-semibold">
                                                {stats.gamesStats[game.id]?.wins || 0}
                                            </span>
                                        </div>
                                    </div>

                                    {
                                        stats.gamesStats[game.id]?.history.length  > 0 && (
                                            <div className="mt-2 text-sm text-gray-600">
                                                Win Rate: {
                                                Math.round((stats.gamesStats[game.id].wins / stats.gamesStats[game.id].history.length) * 100)
                                            }%
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default GiftView;