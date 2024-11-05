import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rules from '../game/Rules';
import Profile from '../profile/Profile';
import App from './App';
function Routing() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;