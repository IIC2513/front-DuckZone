import React, { useState, useEffect, useContext } from 'react';
import logo from '../../assets/imgs/image.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from "../auth/AuthContext";

function Navbar() {
  
    
    const { token, logout } = useContext(AuthContext);
    const isLoggedIn = token && token !== "null" && token !== ""; 
    

  const handleLogout = () => {    
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="flex">
      <a href="/" ><img src={logo} alt="Logo" className="aaaa"/></a>
      <div className="lefttext">
        <a href="/rules">¿Cómo jugar?</a>
        <a href="/ranking">Ranking</a>
        {isLoggedIn && (
          <a href="/profile" className="profile-link">
            <span>Mi perfil</span>
            <AccountCircleIcon className='profile-icon'/>
          </a>
        )}
        {isLoggedIn && (
          <a className="log-button">
            <button className='logout-button' onClick={handleLogout}>
                Cerrar sesión
            </button> 
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