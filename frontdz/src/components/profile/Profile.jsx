import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import mascota from '../../assets/imgs/mascota.png';
import burbuja from '../../assets/imgs/burbuja.png';


function Profile() {
    return (
        <div>
            <h1>Mi Perfil</h1>
            <div className='perfil flexhor'>
                <div>
                    <AccountCircleIcon className='profile-pfp'/>
                    <p className='centerp'>username</p>
                </div>
                <div><img src={mascota} className='mascota'></img></div>
                <div>
                    <img src={burbuja} className='burbuja'></img>
                    <p className='textob'>Carlitos</p>
                    <p className='textob1'>Hello World!</p>
                </div>
                
            </div>
            <p>Aquí desarrollar vista del perfil</p>
            <br />
            <a href='/'>Volver al Inicio</a>
        </div>
    );
}

export default Profile;