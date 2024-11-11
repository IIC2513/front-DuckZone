import React from 'react';
import logo from '../../assets/imgs/image.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutButton from '../profile/Logout';

function Navbar() {
    return (
        <nav class="flex">
            <a href="/" ><img src={logo} alt="Logo" className="aaaa"/></a>
            <div className="lefttext">
                <a href="/rules">¿Cómo jugar?</a>
                <a href="/newgame">Ranking</a>
                <a href="/profile" className="profile-link">
                    <span>Mi perfil</span>
                    <AccountCircleIcon className='profile-icon'/>
                </a>
                <LogoutButton href="/logout" className="logout-button">
                    Cerrar sesión
                </LogoutButton>
            </div>
        </nav>
        
    );
}

export default Navbar;