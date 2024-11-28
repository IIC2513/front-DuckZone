import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import mascota from '../../assets/imgs/mascota.png';
import burbuja from '../../assets/imgs/burbuja.png';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

function Profile() { 
    const { token } = useContext(AuthContext)
    const [msg, setMsg] = useState("");
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
  
    const config = {
      method: 'get',
      url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
      headers: { 
        'Authorization': `Bearer ${token}`,
      }
    };
  
    useEffect(() => {
        axios(config)
            .then((response) => {
                console.log("Valid token");
                setMsg(response.data.message);
                setUserId(response.data.user.sub);
            })
            .catch((error) => {
                console.error("Invalid token");
                console.error(error);
                setMsg("not logged");
            });
    }, []);
    
    useEffect(() => {
        if (userId) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((response) => {
                setUserInfo(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user info");
                console.error(error);
            });
        }
    }, [userId]);

    if (msg == "not logged") {
      return (
          <div>
              <h1>Perfil</h1>
              <p>Debes estar logueado para ver esta página</p>
              <a href='/login'>Iniciar sesión</a>
          </div>
        );
    } else {
    return (
      <div>
        <h1>Mi Perfil</h1>
        <div className='perfil flexhor'>
            <div>
              <AccountCircleIcon className='profile-pfp'/>
              <p className='centerp'>{userInfo ? userInfo.username : "Cargando..."}</p>
            </div>
            <div><img src={mascota} className='mascota'></img></div>
            <div>
              <img src={burbuja} className='burbuja'></img>
              <p className='textob'>{userInfo ? userInfo.name_duck : "Cargando..."}</p>
              <p className='textob1'>Batalla para que tu patito sea más grande y fuerte. Sigue así uwu</p>
            </div>
            
        </div>
        <a href='/editprofile'>Editar Perfil</a>
        <br />
        <a href='/'>Volver al Inicio</a>
      </div>
    );
    }
  }

export default Profile;
