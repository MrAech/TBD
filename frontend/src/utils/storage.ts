export interface GameHistory{
    date: string;
    result: 'win' | 'loss' | 'draw';
    oppenents?: string[];
}

export interface GameStats{
    wins: number;
    history: GameHistory[];
}


export interface LocalStorageData{
    storagePreference: 'local' | 'account' | undefined;
    gameStats: {
        [gameId: string]: GameStats;
    };
}

const GAME_STORAGE = "game_data";

// Default storage Initalization struct
export const intialiseStorage = (): LocalStorageData => {
    const existingData = localStorage.getItem(GAME_STORAGE);
    if(existingData){
        return JSON.parse(existingData);
    }

    // If No data Exists then below
    const defaultData: LocalStorageData = {
        storagePreference: undefined,
        gameStats: {},
    };

    localStorage.setItem(GAME_STORAGE, JSON.stringify(defaultData));
    return defaultData;
};

export const getStorageData = (): LocalStorageData => {
    const data = localStorage.getItem(GAME_STORAGE);
    if(data){
        return JSON.parse(data);
    }
    // If No data Exists then return default
    return intialiseStorage();
}

export const saveStorageData = (data: LocalStorageData) => {
    localStorage.setItem(GAME_STORAGE, JSON.stringify(data));
}


// Reset Storage Preference Option
export const resetStroragePref = () =>{
    const data = getStorageData();
    data.storagePreference = undefined;
    saveStorageData(data);
}

export const getStoragePref = (): 'local' | 'account' | undefined => {
    const data = getStorageData();
    return data.storagePreference;
}

export const setStoragePref = (pref: 'local' | 'account') => {
    const data = getStorageData();
    data.storagePreference = pref;
    saveStorageData(data);
}

export const getGameStats = (gameId: string): GameStats =>{
    const data = getStorageData();
    return data.gameStats[gameId] || { wins: 0, history: []};
};

// todo - use the implementation
//  - NOTE: This Function still needs implimentation with Game History during actual
export const updateGameWins = (gameId: string) => {
    const data = getStorageData();
    if(!data.gameStats[gameId]){
        data.gameStats[gameId] = {wins: 0, history: []};
    }
    data.gameStats[gameId].wins += 1;
    saveStorageData(data);
};

export const addGameHistory = (
    gameId: string,
    result: 'win' | 'loss' | 'draw',
    opponents?: string[]
) => {
    const data = getStorageData();
    if(!data.gameStats[gameId]){
        data.gameStats[gameId] = {wins: 0, history: []};
    }

    const historyEntry: GameHistory = {
        date: new Date().toISOString(),
        result,
        ...(opponents && {opponents})
    };

    data.gameStats[gameId].history.push(historyEntry);
    if(result === 'win'){
        data.gameStats[gameId].wins += 1;
    }
    saveStorageData(data);
}

export const getTotalWins = (): number => {
    const data = getStorageData();
    return Object.values(data.gameStats).reduce(
        (total, game) => total + game.wins,
        0
    );
};

// Sorted by Date
export const getFullHistory = () => {
    const data = getStorageData();
    const fullhistory: { gameId: string; history: GameHistory }[] = [];

    Object.entries(data.gameStats).forEach(([gameId, stats]) => {
        stats.history.forEach(history => {
            fullhistory.push({gameId, history});
        });
    });

    return fullhistory.sort((a,b) =>
    new Date(b.history.date).getTime() - new Date(a.history.date).getTime());
};





