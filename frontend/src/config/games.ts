import {
    namePlaceThumbnail,
    rajaRaniThumbnail,
    ticTacToeThumbnail
} from '../assets/assets';


// todo Remove this and Use a proper DB API to fetch games

export interface Game{
    id: string;
    title: string;
    playerCount: string;
    image: string;
}

export const games: Game[] = [
    {
        id: "name-place",
        title: "Name Place Animal Objects",
        playerCount: "2< players",
        image: namePlaceThumbnail
    },
    {
        id: "raja-rani",
        title: "Raja Rani Bajer and Choor",
        playerCount: "3< players",
        image: rajaRaniThumbnail
    },
    {
        id: "tic-tac-toe",
        title: "Tic Tac Toe",
        playerCount: "3< players",
        image: ticTacToeThumbnail
    }
];