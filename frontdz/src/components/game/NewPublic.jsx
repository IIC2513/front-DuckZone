import { useState, useEffect, useContext } from 'react';
import './GamesForm.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const NewPublic = () => {
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { token } = useContext(AuthContext)
    const [msg, setMsg] = useState("");
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
  
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
            })
            .catch((error) => {
                console.error("Error fetching user info");
                console.error(error);
            });
        }
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`, {
                game: {
                    room_name: roomName,
                    playerOne: userInfo.id,
                    type: 'Standard' // Tipo de juego por defecto
                }
            });
            setSuccess('Sala creada existosamente!');
            console.log('Room created:', response.data);
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigate(`../games/${response.data.game.id}`);
        } catch (err) {
            setError('Ha ocurrido un error al crear la sala.');
            console.error('Error creating room:', err);
        }
    };

    return (
        <div className="GamesForm">
            <h1>Crear Nueva Sala Pública</h1>
            <form onSubmit={handleSubmit}>
                <label className='textoinput'>
                    Nombre de la Sala
                    <input
                        type="text"
                        id="roomName"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Crear Sala" />
            </form>
            {error && <div className="error">{error}</div>}
            {success && <div className="successMsg">{success}, redirigiendo...</div>}
        </div>
    );
};

export default NewPublic;