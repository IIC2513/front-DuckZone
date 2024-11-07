import React, { useEffect } from 'react';
import axios from 'axios';

function Cards() {
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards`)
            .then((response) => {
                setCards(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    const getImageForType = (type) => {
        switch (type) {
            case 'fuego':
                return '../src/assets/imgs/tipos/Fuego.png';
            case 'agua':
                return '../src/assets/imgs/tipos/Agua.png';
            case 'aire':
                return '../src/assets/imgs/tipos/Aire.png';
            case 'tierra':
                return '../src/assets/imgs/tipos/Tierra.png';
            case 'hielo':
                return '../src/assets/imgs/tipos/Hielo.png';
            default:
                return '';
        }
    };

    return (
        <div>
            <h1>Cartas</h1>
            <p>Aquí puedes ver todas las cartas del juego</p>
            <div className="cards-grid">
                {cards.map((card, index) => (
                    <div key={index} className="card-item">
                        <p>{card.name}</p>
                        <img className="element-icon" src={getImageForType(card.type)} alt={card.type} />
                    </div>
                ))}
            </div>
            <br />
            <a href='/'>Volver al Inicio</a>
        </div>
    );
}

export default Cards;