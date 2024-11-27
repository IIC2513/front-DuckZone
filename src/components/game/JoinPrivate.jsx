import React, { useState } from 'react';
import './GamesForm.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const JoinPrivate = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { pathname } = window.location;
    const gameId = pathname.split('/').pop();
    const userId = localStorage.getItem('user_id');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/join_private/${gameId}`, { userId, room_password: password }); 
            if (response.status === 200) {
                await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/update_player_two/${gameId}`, {
                    newId: userId
                });
                await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/update_player_count/${gameId}`, {
                    player_count: 2
                });

                navigate(`/games/${gameId}`);
            }
        } catch (error) {
            console.error("Failed to join private game:", error);
        }
    };

    return (
        <div className="GamesForm">
            <h1>Unirse a Sala Privada</h1>
            <form onSubmit={handleSubmit}>
                <label className='textoinput'>
                    Contraseña de la Sala
                    <input
                        type="password"
                        id="room_password"
                        name="room_password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Unirse" />
            </form>
        </div>
    );
};

export default JoinPrivate;