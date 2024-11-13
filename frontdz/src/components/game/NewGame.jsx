import React from 'react';

function NewGame() {
    const handlePublicClick = () => {
        window.location.href = '/newpublic';
    };

    const handlePrivateClick = () => {
        window.location.href = '/newprivate';
    };

    return (
        <>
        <br></br>
        <br></br>
        <div className='pantallaseleccion'>
            <br></br><h1 className='nuevap'>NUEVA PARTIDA</h1>
            <h3 className='mod'>Escoge la modalidad en la que deseas jugar</h3>
            <br />
            <div className='flex'>
            <button className='partida' onClick={handlePublicClick}>
                <h1 className='tipo'>Pública</h1>
                <p className='descpar'>Las partidas públicas son aquellas en las que se te asignará un contrincante aleatorio que también está esperando por jugar.
                ¡Mejor opción si quieres pasar el rato solo disfrutando en DuckZone!</p>
            </button>
            <button className='partida' onClick={handlePrivateClick}>
                <h1 className='tipo'>Privada</h1>
                <p className='descpar'>Las partidas privadas son aquellas en las que tendrás un link único de juego con el que puedes invitar amigos. <br></br>¡Mejor opción si quieres pasar un rato con gente cercana!</p>
            </button>
            </div>
            <br></br>
            <a href='/'>Volver al Inicio</a>
        </div>
        </>
    );
}

export default NewGame;