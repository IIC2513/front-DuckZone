import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [data, setData] = useState(null);

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

                console.log("User data:", userResponse.data);
                if (userResponse.data.is_admin === 1) {
                    setIsAdmin(true);
                }
                
                const reportAmount = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reports/user/report-counts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(reportAmount.data);

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
                <p>Usuario</p>
                <p>Cantidad de reportes</p>
                <p>Estado de cuenta</p>
                <p>Suspender/Activar cuenta</p>
            </div>
            {Array.isArray(data) && (
                <div>
                    {data.map((coso, index) => (
                        <div key={index} className='grid'>
                            <p className='elemento'>{coso.username}</p>
                            <p className='elemento'>{coso.count}</p>
                            <p className='elemento'>estado</p>
                            <p className='elemento'>estado</p>
                            </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Users;