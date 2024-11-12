import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        mail: mail,
        password: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        const is_admin = response.data.is_admin; // Extraer el rol de administrador
        localStorage.setItem('token', access_token);
        localStorage.setItem('is_admin', is_admin); // Almacenar el rol de usuario
        setToken(access_token);
        console.log("Se seteo el token: ", access_token);
        console.log("Es administrador: ", is_admin);
        console.log(response);
        window.location.href = '/';
      }).catch((error) => {
        console.error('An error occurred while trying to login:', error.response.data);
        const motive = error.response.data
        setMsg("Error al iniciar sesión: " + motive +".");
        setError(true); // aquí puede haber más lógica para tratar los errores
      });
  };

  return (
    <div className="Login">
      {(msg.length > 0 && !error) && <div className="successMsg"> {msg} </div>}
      {error && <div className="error"> {msg} </div>}
      <h1>¡Bienvenido de vuelta!</h1>
      <h3>Debes iniciar sesión para comenzar a jugar</h3>
      <form onSubmit={handleSubmit}>
        <label className='textoinput'>
          Email
          <input 
            type="email" 
            name="email"
            value={mail}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Iniciar sesión" />
      </form>
      <br></br>
      <p>¿Patito nuevo? <a href='/signup'>Regístrate aquí.</a></p>
    </div>
  );
}

export default Login;