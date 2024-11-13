import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

function Signup() {
  const [username, setUsername] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name_duck, setNameDuck] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        username: username,
        mail: mail,
        password: password,
        name_duck: name_duck
      }).then((response) => {
        console.log('Registro exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg('Registro exitoso! Redirigiendo a la página de login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }).catch((error) => {      
      console.error('Ocurrió un error:', error);
      const motive = error.response && error.response.data && error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].message : (error.response.data ? error.response.data : 'Unknown error');
      if (motive === "username must be unique") { setMsg('Error al registrarse: El nombre de usuario ya está en uso.'); } 
      else {setMsg("Error al registrarse: " + motive +"."); };
      setError(true);
      });
    }

  return (
    <div className="Login">
      <h1>Estás a un paso de la batalla...</h1>
      <h3>Debes registrarte para comenzar a jugar</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input 
            type="text" 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
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
        <label>
          Nombre para tu patito
          <input
            type="text" 
            name="duckname"
            value={name_duck}
            onChange={e => setNameDuck(e.target.value)}
            required
          />
          </label>
        <input type="submit" value="Regístrate" />
      </form>
    {(msg.length > 0 && !error) && <div className="successMsg"> {msg} </div>}
    {error && <div className="error"> {msg} </div>}
    </div>
  );
}

export default Signup;