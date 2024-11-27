import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NewReport() {
    const { gameId, reported_id } = useParams();
    const [playerReporting, setPlayerReporting] = useState('');
    const [playerReported, setPlayerReported] = useState('');
    const [reportText, setReportText] = useState('');
    const [userReported,setUserReported]= useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setPlayerReporting(localStorage.getItem('user_id'));
        setPlayerReported(reported_id)
        const fetchUserReported = async () => {
            try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${reported_id}`, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });
            setUserReported(response.data.username);
            } catch (error) {
            console.error('Error fetching reported user data:', error);
            }
        };

        fetchUserReported();
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
            <h3>Estás reportando a {userReported}</h3>
            <p>Por favor, explícanos un poco más al respecto:</p>
            <input 
                type="text" 
                placeholder="Escribe aquí..." 
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                className='cosotexto'
            />
            <br />
            <button onClick={handleReportSubmit}>Enviar Reporte</button>
            <br />
            <a href='/'>Volver al Inicio</a>
        </div>
    );
}

export default NewReport;