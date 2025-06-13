import React from 'react';
import { setStoragePref } from '../../utils/storage.ts';
import { Menu} from 'lucide-react';


interface LoginPromptProp{
    onClose: () => void;
    onStorageSet?: () => void;
}

const LoginPrompt: React.FC<LoginPromptProp> = ({ onClose, onStorageSet }) => {
    const handleChoice =(preference: 'local' | 'account') =>{
        setStoragePref(preference);
        onStorageSet?.();
        onClose();
    };

    return(
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Save Your Game History</h2>
            <p className="text-gray-600 mb-6">
                Choose how you want to save your game history:
            </p>

            <div className="space-y-4">
                <button
                    onClick={() => handleChoice('account')}
                    className="w-full py-3 px-4 bg-[#f28f8f] text-white rounded-md hover:bg-[#e07f7f] transition-colors"
                >
                    Sign In to Save Online
                    <p className="text-sm opacity-80">(Coming Soon)</p>
                </button>

                <button
                    onClick={() => handleChoice('local')}
                    className="w-full py-3 px-4 border-2 border-[#F28f8f] text-[#F28f8f] rounded-md hover:bg-[#FFE2E2] transition-colors"
                >
                    Save Locally on This Device
                </button>
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center flex items-center justify-center gap-1">
                <span>You can change this preference later in</span>
                <Menu className="w-4 h-4 inline-block" />
                <span>settings</span>
            </div>
        </div>
    );
};


export default LoginPrompt;