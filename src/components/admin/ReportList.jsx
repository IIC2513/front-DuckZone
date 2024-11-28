import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reports() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [data, setData] = useState(null);
    const [usernames, setUsernames] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                console.log("Token:", token); 

                const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/current`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const reportsData = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reports`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(reportsData.data)
                setData(reportsData.data);

                console.log("User data:", userResponse.data);
                if (userResponse.data.is_admin === 1) {
                    setIsAdmin(true);
                }

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
    }, []);

    return (
        <>
            <h1>Reportes</h1>
            {isAdmin ? (
                <p>Bienvenido, Admin!</p>
            ) : (
                <p>No tienes permisos de administrador.</p>
            )}
            <div className='headertab grid'>
                <p>Víctima</p>
                <p>Reportado</p>
                <p>Estado del reporte</p>
                <p>Descripción</p>
            </div>
            {Array.isArray(data) && (
                <div>
                    {data.map((report, index) => (
                        <div key={index} className='grid'>
                            <p className='elemento'>{usernames[report.victim]}</p>
                            <p className='elemento'>{usernames[report.reported]}</p>
                            <a className='elemento' href={`/adm/reports/${report.id}`}>{report.status}</a>
                            <p className='elemento'>{report.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Reports;