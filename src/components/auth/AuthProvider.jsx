import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem('user_id', userId);
    }, [userId]);

    function logout() {
        setToken(null);
        setUserInfo(null);
        setUserId(null);
    }

    useEffect(() => {
        if (token) {
            fetchUserId();
        }
    }, [token]);

    async function fetchUserId() {
        const config = {
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
            headers: { 
                'Authorization': `Bearer ${token}`,
            }
        };

        try {
            const response = await axios(config);
            console.log("Valid token");
            setMsg(response.data.message);
            setUserId(response.data.user.sub);
        } catch (error) {
            console.error("Invalid token");
            console.error(error);
            setMsg("not logged");
        }
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout, userInfo, setUserInfo, userId, setUserId, fetchUserId }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;