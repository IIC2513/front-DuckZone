import React, { useContext, useState } from 'react';
import './Login.css';
import { AuthContext } from '../auth/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    logout();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  React.useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        closePopup();
        window.location.reload();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      {showPopup && (
        <div className="popup">
            <h2>Logout exitoso</h2>
            <p>Has hecho logout con éxito!</p>
            <button type="button" onClick={() => { closePopup(); window.location.reload(); }}>
              Cerrar
            </button>
        </div>
      )}

      <a onClick={() => { handleLogout();}}>Cerrar sesión</a>
    </>
  );
};

export default LogoutButton;
