import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rules from '../game/Rules';
import Profile from '../profile/Profile';
import NewGame from '../game/NewGame';
import NewReport from '../profile/NewReport';
import Cards from '../game/Cards';
import Board from '../game/Board';
import Login from '../profile/Login';
import Signup from '../profile/Signup';
import App from './App';
import Navbar from './navbar';
import Ranking from './ranking';
import About from './about';
import UserCheck from '../protected/UserCheck';
import AdminCheck from '../protected/AdminCheck';
function Routing() {
    return(
        <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/newgame" element={<NewGame />} />
                <Route path="/newreport" element={<NewReport />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/board" element={<Board />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/usercheck" element={<UserCheck />} />
                <Route path="/admincheck" element={<AdminCheck />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;