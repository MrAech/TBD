import type {FC} from "react";
import { motion, type AnimationControls} from "framer-motion";

interface GameCardProp{
    title: string;
    image: string;
    playerCount: string;
    onClick: () => void;
    animationControls: AnimationControls;
}

const GameCard: FC<GameCardProp> =({
                                       image, title, playerCount, onClick, animationControls
}) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05}}
            animate={animationControls}
            className="bg-[#F28F8F] p-4 rounded-xl shadow-md w-full max-w-[300px] text-black text-left hover:bg-[#f57b7b] border-0"
        >
            <div className="aspect-video w-full overflow-hidden rounded-md mb-2">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <h2
                className="text-lg font-bold font-['Liu_Jian_Mao_Cao']"
            >
                {title}
            </h2>
            <p className="font-bold text-base font-['Liu_Jian_Mao_Cao'] opacity-90">{playerCount}</p>
        </motion.button>
    );
};

export default GameCard;