import React from 'react';
import { useAnimation } from 'framer-motion';
import GameCard from '../GameCard';
import { games } from '../../config/games';

export const GamesView: React.FC = () => {
    const animationControls = useAnimation();

    React.useEffect(() =>{
        animationControls.start({
            y: [0, -5, 0],
            transition: {
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut'
            },
        });
    }, [animationControls]);

    return(
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl place-items-center">
                {
                    games.map((game) => (
                        <GameCard
                            key={game.title}
                            title={game.title}
                            playerCount={game.playerCount}
                            image={game.image}
                            animationControls={animationControls}
                            // todo : Add Route Logic
                            onClick={() => alert(`You Selected: ${game.title}`)}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default GamesView;