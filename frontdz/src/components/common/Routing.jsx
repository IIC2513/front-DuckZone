import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rules from '../game/Rules';
import Profile from '../profile/Profile';
import NewGame from '../game/NewGame';
import NewReport from '../profile/NewReport';
import Cards from '../game/Cards';
import App from './App';
function Routing() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/newgame" element={<NewGame />} />
                <Route path="/newreport" element={<NewReport />} />
                <Route path="/cards" element={<Cards />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;