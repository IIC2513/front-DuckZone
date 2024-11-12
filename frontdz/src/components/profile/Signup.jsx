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
      setError(true); // aquí puede haber más lógica para tratar los errores
      });
    }

  return (
    <div className="Login">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email"
            value={mail}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Duck Name:
          <input
            type="text" 
            name="duckname"
            value={name_duck}
            onChange={e => setNameDuck(e.target.value)}
            required
          />
          </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Signup;