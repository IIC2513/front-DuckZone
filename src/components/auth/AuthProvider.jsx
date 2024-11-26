import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    function logout() {
        setToken(null);
        setUserInfo(null);
    }

    return (
        <AuthContext.Provider value={{token, setToken, logout, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;