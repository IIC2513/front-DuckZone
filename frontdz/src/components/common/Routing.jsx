import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rules from '../game/Rules';
import Profile from '../profile/Profile';
import NewGame from '../game/NewGame';
import NewReport from '../profile/NewReport';
import App from './App';
function Routing() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<App />} />
                <Route path="/newgame" element={<NewGame />} />
                <Route path="/newreport" element={<NewReport />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;