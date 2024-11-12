import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../assets/imgs/image.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutButton from '../profile/Logout';

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(() => setIsLoggedIn(true));
        }
    }, []);

    return (
        <nav className="flex">
            <a href="/" ><img src={logo} alt="Logo" className="aaaa"/></a>
            <div className="lefttext">
                <a href="/rules">¿Cómo jugar?</a>
                <a href="/newgame">Ranking</a>
                {isLoggedIn && (
                    <a href="/profile" className="profile-link">
                    <span>Mi perfil</span>
                    <AccountCircleIcon className='profile-icon'/>
                    </a>
                )}
                {isLoggedIn && (
                    <a className="log-button">
                        <LogoutButton href="/logout">
                            Cerrar sesión
                        </LogoutButton>
                    </a>
                )}
                {!isLoggedIn && (
                    <a href="/login">Iniciar sesión</a>
                )}
            </div>
        </nav>
    );
}

export default Navbar;