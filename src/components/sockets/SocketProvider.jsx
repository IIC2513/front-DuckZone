import { useEffect , useState, useRef} from "react";
import { SocketContext } from "./SocketContext";
import { io } from "socket.io-client";

const SocketProvider = ({ children }) => {
    const socket = useRef();

    const connectSocket = (userId) => {
        const storedUserId = userId || localStorage.getItem('user_id');
        if (storedUserId) {
            socket.current = io(import.meta.env.VITE_BACKEND_URL, {
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 1000    
            });

            socket.current.emit('addUser', Number(storedUserId));
        }
    };

    const disconnectSocket = () => {
        socket.current?.disconnect();
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if(storedUserId) connectSocket(storedUserId);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;