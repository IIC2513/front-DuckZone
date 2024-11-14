import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ranking(){
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch data from the database (mocked API endpoint)
    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token'); // Obtén el token de autenticación desde el almacenamiento local
            console.log("Token:", token); // Imprime el token
    
            const url = `${import.meta.env.VITE_BACKEND_URL}/users/api/leaderboard?page=${page}`;
            console.log("URL:", url); // Imprime la URL de la solicitud
    
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados de la solicitud
                }
            });
    
            console.log("Response data:", response.data); // Imprime la respuesta de la solicitud
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
        console.log("Loading:", false); // Imprime el estado de carga
    };
    
    useEffect(() => {
        fetchData();
    }, [page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };
    
    return(
        <>
        <br></br>
        <br></br>
        <br></br>        <br></br>
        <br></br>

        <h1>RANKING</h1>
        <h3>Estos son algunos de nuestros mejores batallantes:</h3>
        <div className="container">
        <table className="table">
            <thead>
            <tr>
                <th className="header">Top</th>
                <th className="header">Usuario</th>
                <th className="header">Victorias/Derrotas</th>
            </tr>
            </thead>
            <tbody>
            {data.map((user, index) => (
                <tr key={index}>
                <td className="cell">{index+1}</td>
                <td className="cell">
                    <div className="user">
                    <div className="avatar"></div>
                    <span>{user.username}</span>
                    </div>
                </td>
                <td className="cell">{user.wins}/{user.defeats}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <button className="button" onClick={loadMore} disabled={loading}>
            {loading ? "Cargando..." : "Cargar Más"}
        </button>
        </div>
        </>
    )
}

export default Ranking;