import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

function UserCheck() { 
  const { token } = useContext(AuthContext)
  const [msg, setMsg] = useState("");

  const config = {
    'method': 'get',
    'url': `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
    'headers': { 
      'Authorization': `Bearer ${token}` 
    }
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        console.log("Valid token");
        console.log(response);
        setMsg(response.data.message);
      })
      .catch((error) => {
        console.error("Invalid token");
        console.error(error);
        setMsg(error.message);
      });
    }, []);

  return (
    <div>
      <h1>{msg}</h1>
    </div>
  );
}
    
export default UserCheck;