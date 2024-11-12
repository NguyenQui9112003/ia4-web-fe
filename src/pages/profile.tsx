import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = window.localStorage.getItem('token');

            if (!token) {
                navigate('/signIn');
                return;
            }

            // Only parse if token is not null
            const parsedToken = token ? JSON.parse(token) : null;
            const accessToken = parsedToken.access_token;

            try {
                const response = await fetch('http://localhost:3000/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    navigate('/signIn');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/signIn');
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
            {username ? <p>Username: {username}</p> : <p>Loading...</p>}
        </>
    );
};

export default ProfilePage;
