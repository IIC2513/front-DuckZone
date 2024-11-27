import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NewReport() {
    const { gameId } = useParams();
    const [playerReporting, setPlayerReporting] = useState('');
    const [playerReported, setPlayerReported] = useState('');
    const [reportText, setReportText] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchGameData = async () => {
            try {
                const response = await axios.get(`/games/${gameId}`);
                const data = response.data;
                setPlayerReporting(data.playerOne);
                setPlayerReported(data.playerTwo);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/current`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (userResponse.data.id !== playerReporting) {
                    setPlayerReporting(userResponse.data.playerTwo);
                    setPlayerReported(userResponse.data.playerOne);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        fetchGameData();
        fetchUserData();
    }, [gameId, playerReporting]);

    const handleReportSubmit = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reports`, {
                victim: playerReporting,
                reported: playerReported,
                status: 'Pendiente',
                description: reportText
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Reporte enviado con éxito');
        } catch (error) {
            console.error('Error sending report:', error);
            alert('Error al enviar el reporte');
        }
    };

    return (
        <div>
            <h1>Reportar</h1>
            <h3>Estás reportando a {playerReported}</h3>
            <p>Por favor, explícanos un poco más al respecto:</p>
            <input 
                type="text" 
                placeholder="Escribe aquí..." 
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
            />
            <br />
            <button onClick={handleReportSubmit}>Enviar Reporte</button>
            <br />
            <a href='/'>Volver al Inicio</a>
        </div>
    );
}

export default NewReport;