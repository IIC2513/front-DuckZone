import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Reportee() {
    const { reportId } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [report, setReport] = useState(null);
    const [usernames, setUsernames] = useState({});

    useEffect(() => {
        console.log("Report ID from URL:", reportId);
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const userId = localStorage.getItem('user_id');
                console.log("Token:", token); 
                console.log("User ID:", userId);

                const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("User data:", userResponse.data);
                if (userResponse.data.is_admin === 1) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }

                const reportResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reports/${reportId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(reportResponse.data);
                setReport(reportResponse.data);

                const usersResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const usernamesMap = {};
                usersResponse.data.forEach(user => {
                    usernamesMap[user.id] = user.username;
                });

                setUsernames(usernamesMap);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [reportId]);

    const handleMarkAsReviewed = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/reports/${reportId}/check`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setReport(prevReport => ({ ...prevReport, status: 'Revisado' }));
        } catch (error) {
            console.error('Error updating report status:', error);
        }
    };

    return (
        <>
            <h1>Reporte</h1>
            {isAdmin ? (
                <p>Bienvenido, Admin!</p>
            ) : (
                <p>No tienes permisos de administrador.</p>
            )}
            {report && (
                <>
                <div className='grid'>
                    <h2>Reporte n°{report.id}</h2>
                    {report.status !== 'Revisado' && (
                        <button onClick={handleMarkAsReviewed}>Marcar como revisado</button>
                    )}
                    {report.status === 'Revisado' && (
                        <p>Revisado</p>
                    )}
                </div>
                <div className='grid'>
                    <div className='elemento'>
                        <h4>Víctima:</h4>
                        <p>{usernames[report.victim]}</p>
                    </div>
                    <div className='elemento'>
                        <h4>Reportado:</h4>
                        <p>{usernames[report.reported]}</p>
                    </div>
                    <div className='elemento'>
                        <h4>Estado del reporte:</h4>
                        <p>{report.status}</p>
                    </div>
                    <div className='elemento'>
                        <h4>Descripción:</h4>
                        <p>{report.description}</p>
                    </div>
                </div>
                </>
            )}
        </>
    );
}

export default Reportee;