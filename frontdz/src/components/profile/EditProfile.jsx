import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const { token, setUserInfo } = useContext(AuthContext);
    const [userInfo, setUserInfoLocal] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        name_duck: "",
        password: "",
        currentPassword: "",
    });
    const [msg, setMsg] = useState("");
    const [userId, setUserId] = useState(null);
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
    }, [token]);

    useEffect(() => {
        if (userId) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserInfoLocal(response.data);
                setFormData({
                    username: response.data.username || '',
                    name_duck: response.data.name_duck || '',
                    password: '',
                    currentPassword: '',
                });
            })
            .catch((error) => {
                console.error("Error al obtener la información del usuario");
                setMsg("Error al cargar los datos de perfil del usuario");
            });
        } else {
            console.error("No se encontró el ID del usuario");
            setMsg("No se encontró el ID del usuario");
        }
    }, [userId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            currentPassword: formData.currentPassword,
        };
        if (formData.username !== userInfo.username) {
            updatedData.username = formData.username;
        }
        if (formData.name_duck !== userInfo.name_duck) {
            updatedData.name_duck = formData.name_duck;
        }
        if (formData.password) {
            updatedData.password = formData.password;
        }

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/profile/editprofile`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setMsg("Perfil actualizado exitosamente");
            setUserInfo(response.data.user);
            navigate("/profile");
        })
        .catch((error) => {
            console.error("Error al actualizar el perfil", error);
            setMsg("Error al actualizar el perfil, verifica que la contraseña actual ingresada sea correcta");
        });
    };

    if (!userInfo) {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        );
    };

    return (
        <div className="Login">
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>    
                <label>
                    Nombre de patito
                    <input
                        type='text'
                        name='name_duck'
                        value={formData.name_duck}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Contraseña
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Contraseña Actual
                    <input
                        type='password'
                        name='currentPassword'
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </label>    
                <button type='submit'>Actualizar</button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}

export default EditProfile;