import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminFooter() {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try{
                const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/current`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (userResponse.data.is_admin === 1) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Error loading footer:", error);
            }
        };
        fetchData();
    }, []);

    return (
            <>
                {isAdmin && (
                    <div className='footer'>
                    <p className='el-foot'>¡Hola, Admin!</p>
                    <a className='el-foot' href='/adm/reports'>Usuarios</a>
                    <a className='el-foot' href='/adm/reports'>Reportes</a>
                    </div>
                )}
            </>
    );
}

export default AdminFooter;