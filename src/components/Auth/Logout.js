import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
    const history = useHistory();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        setIsLoggedOut(true);
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <div>
            {!isLoggedOut && (
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
    );
}

export default Logout;
