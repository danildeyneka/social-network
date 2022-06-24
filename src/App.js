import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ProfileWithRedirect from './components/Profile/Profile';
import {Navigate, Route, Routes} from "react-router-dom";
import MessengerWithRedirect from "./components/Messenger/Messenger";
import Users from "./components/Users/Users";
import Login from "./components/Login/Login";

const App = () => {
    return (<div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className='app-wrapper__content'
            // заворачиваем ту часть, где будут меняться страницы в роуты - а сам навбар для роутов выше
        >
            <Routes>
                <Route path='/profile/:userId' element={<ProfileWithRedirect/>}/>
                <Route path='/profile/' element={<ProfileWithRedirect/>}/>
                <Route path='/messenger/*' element={<MessengerWithRedirect/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<Navigate to='/profile'/>}
                />
            </Routes>
        </div>
    </div>)

}

export default App;