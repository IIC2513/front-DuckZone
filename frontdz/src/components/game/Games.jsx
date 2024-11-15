import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { AuthContext } from "../auth/AuthContext";
import { fetchGames } from "../api/sala-de-espera";
import ToastManager from "../common/toasts/Toast";
import "./Games.css";
import axios from "axios";

const Games = () => {
    const [games, setGames] = useState([]);
    const [toasts, setToasts] = useState([]);
    const { token } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const config = {
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      };
  

    useEffect(() => {
        console.log("useEffect ejecutado");
        const loadGames = async () => {
            try {
                const data = await fetchGames();
                setGames(data);
            } catch (error) {
                console.error("Error loading games:", error);
                addToast("No hay juegos disponibles", "error");
            }
        };

        loadGames();
    }, []);

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
                console.log(response.data);
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user info");
                console.error(error);
            });
        }
    }, [userId]);

    const addToast = (message, type) => {
        setToasts((prevToasts) => [...prevToasts, { message, type }]);
    };

    const handleJoinGame = async (game) => {
        if (!userInfo || !userInfo.id) {
            addToast("Usuario no autenticado", "error");
            return;
        };
        if (game.player_count >= 2) {
            addToast("Juego lleno", "error");
            return;
        };
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/update_player_two/${game.id}`, {
                newId: userInfo.id
            });
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/update_player_count/${game.id}`, {
                player_count: game.player_count + 1
            });
            navigate(`/games/${game.id}`);
        } catch (error) {
            console.error("Error joining game:", error);
            addToast("Error al unirse al juego", "error");
        }
    };


    console.log("games", games);
    return (
        <div className="pregame">
            <h1>Salas de Espera</h1>
            <Link to="/newgame">
                <button>Crear Juego</button>
            </Link>
            <h2>Juegos Disponibles:</h2>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        <p className="listedGame">{game.room_name}</p>
                        <p className="listedGame">{game.player_count}/2</p>
                        <img className="locks" src={game.type === 'Private' ? '/src/assets/imgs/padlock.png' : '/src/assets/imgs/padlock-unlock.png'} alt={game.type} />
                        <button onClick={() => handleJoinGame(game)}>Unirse</button>
                    </li>
                ))}
            </ul>
            <ToastManager toasts={toasts} removeToast={(index) => setToasts(toasts.filter((_, i) => i !== index))} />
        </div>
    );
};

export default Games; 