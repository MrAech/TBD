import type { FC } from 'react';
import { LogOut } from 'lucide-react';

interface MenuDropdownProp{
    onReset: () => void;
    onClose: () => void;
}


export const MenuDropdown: FC<MenuDropdownProp>=(
    { onReset, onClose }
) =>{
    return (
        <>
            {/* BackDrop - Setting */}
            <div
                className="fixed inset-0"
                onClick={onClose}
            />

            {/* Setting Dropdown */}
            <div
                className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
                <div className="py-1">
                    <button
                        onClick={() => {
                            onReset();
                            onClose();
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Reset Storage Preference
                    </button>
                </div>
            </div>
        </>
    );
};


export default MenuDropdown;