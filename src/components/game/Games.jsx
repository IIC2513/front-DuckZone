import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { AuthContext } from "../auth/AuthContext";
import { fetchGames } from "../api/sala-de-espera";
import ToastManager from "../common/toasts/Toast";
import "./Games.css";
import axios from "axios";
import { io } from "socket.io-client";

const Games = () => {
    const [games, setGames] = useState([]);
    const [toasts, setToasts] = useState([]);
    const { token } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const socket = useRef(null);

    const config = {
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      };

    useEffect(() => {
        const connectSocket = () => {
            socket.current = io(import.meta.env.VITE_BACKEND_URL, {
                transports: ['websocket'],
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            socket.current.on("connect_error", (error) => {
                console.error("WebSocket connection error:", error);
                addToast("Error de conexión WebSocket", "error");
            });

            socket.current.on("player_count_updated", handlePlayerCountUpdated);
            socket.current.on("new_game_created", handleNewGameCreated);

            socket.current.on("disconnect", () => {
                console.warn("WebSocket disconnected. Attempting to reconnect...");
            });

            socket.current.on("reconnect_failed", () => {
                console.error("WebSocket reconnection failed.");
                addToast("Error de reconexión WebSocket", "error");
            });

            socket.current.on("close", (reason) => {
                if (reason === "transport close") {
                    console.warn("WebSocket closed before the connection was established.");
                }
            });
        };

        const handlePlayerCountUpdated = (updatedGame) => {
            setGames(games => games.map(game => game.id === updatedGame.id ? updatedGame : game));
        };

        const handleNewGameCreated = (newGame) => {
            setGames(prevGames => [...prevGames, newGame]);
        };

        const loadGames = async () => {
            try {
                const data = await fetchGames();
                setGames(data);
            } catch (error) {
                console.error("Error loading games:", error);
                addToast("No hay juegos disponibles", "error");
            }
        };

        connectSocket();
        loadGames();

        return () => {
            if (socket.current) {
                socket.current.off("player_count_updated", handlePlayerCountUpdated);
                socket.current.off("new_game_created", handleNewGameCreated);
                // No desconectamos el socket aquí
            }
        };
    }, []); // Empty dependency array to run only once on mount

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
    }, [token]);

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

    useEffect(() => {
        console.log("games", games);
    }, [games]);

    const handleJoinGame = async (game) => {
        if (!userInfo || !userInfo.id) {
            addToast("Usuario no autenticado", "error");
            return;
        }
        if (game.player_count >= 2) {
            addToast("Juego lleno", "error");
            return;
        }
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/update_player_two/${game.id}`, {
                newId: userInfo.id
            });
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/update_player_count/${game.id}`, {
                player_count: game.player_count + 1
            });

            setGames(games => games.map(g => g.id === game.id ? { ...g, player_count: game.player_count + 1 } : g));

            navigate(`/games/${game.id}`);
        } catch (error) {
            console.error("Error joining game:", error);
            addToast("Error al unirse al juego", "error");
        }
    };

    const addToast = (message, type) => {
        setToasts([...toasts, { message, type }]);
    };

    return (
        <div className="pregame">
            <h1>Salas de Espera</h1>
            <Link to="/newgame">
                <button>Crear Juego</button>
            </Link>
            <h2>Juegos Disponibles:</h2>
            <ul className="gameList">
                {games.filter(game => game.player_count < 2 && !game.started).map(game => (
                    <li className="gameItem" key={game.id}>
                        <p className="listedGame">{game.room_name}</p>
                        <p className="listedGame">{game.player_count}/2</p>
                        <img className="locks" src={game.type === 'Private' ? '/src/assets/imgs/padlock.png' : '/src/assets/imgs/padlock-unlock.png'} alt={game.type} />
                        {game.type === 'Standard' ? (
                            <button onClick={() => handleJoinGame(game)}>Unirse</button>
                        ) : (
                            <button onClick={() => navigate(`/joinprivate/${game.id}`)}>Unirse</button>
                        )}
                    </li>
                ))}
            </ul>
            <ToastManager toasts={toasts} removeToast={(index) => setToasts(toasts.filter((_, i) => i !== index))} />
        </div>
    );
};

export default Games;