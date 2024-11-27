import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rules from '../game/Rules';
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';
import NewGame from '../game/NewGame';
import NewReport from '../profile/NewReport';
import Cards from '../game/Cards';
import Login from '../profile/Login';
import Signup from '../profile/Signup';
import Games from '../game/Games';
import NewPublic from '../game/NewPublic';
import NewPrivate from '../game/NewPrivate';
import App from './App';
import Navbar from './navbar';
import Ranking from './ranking';
import About from './about';
import UserCheck from '../protected/UserCheck';
import AdminCheck from '../protected/AdminCheck';
import GameBoard from '../game/GameBoard';
import Reports from '../admin/ReportList';
import AdminFooter from '../admin/Footer';
import Users from '../admin/UserList';
import Report from '../admin/AnalyzeReport';
import JoinPrivate from '../game/JoinPrivate';
function Routing() {
    return(
        <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/newgame" element={<NewGame />} />
                <Route path="/newreport/:id/:reported_id" element={<NewReport />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/games" element={<Games />} />
                <Route path="/newpublic" element={<NewPublic />} />
                <Route path="/newprivate" element={<NewPrivate />} />
                <Route path="/usercheck" element={<UserCheck />} />
                <Route path="/adm/reports" element={<Reports />} />
                <Route path="/adm/reports/:id" element={<Report />} />
                <Route path="/adm/users" element={<Users />} />
                <Route path="/admincheck" element={<AdminCheck />} />
                <Route path="/games/:id" element={<GameBoard />} /> 
                <Route path="/joinprivate/:id" element={<JoinPrivate />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
            <br></br>
            <AdminFooter />
        </BrowserRouter>
        </>
    )
}

export default Routing;