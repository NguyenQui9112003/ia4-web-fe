import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

export const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const logOutClick = () => {
        logout();
        navigate(`/signIn`);
    };

    const viewProfileClick = () => {
        navigate(`/profile`);
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold mb-1">Unflash Gallery</p>
                <div className="flex flex-row mb-3">
                    <button
                        className="bg-amber-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg mr-1"
                        onClick={viewProfileClick}
                    >
                        Profile
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-1"
                        onClick={logOutClick}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;
