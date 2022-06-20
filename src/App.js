import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Routes, Route} from "react-router-dom";
import Messenger from "./components/Messenger/Messenger";
import Users from "./components/Users/Users";

const App = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper__content'
            // заворачиваем ту часть, где будут меняться страницы в роуты - а сам навбар для роутов выше
            >
                <Routes>
                    <Route path='/profile/:userId' element={<Profile/>}/>
                    <Route path='/profile/' element={<Profile/>}/>
                    <Route path='/messenger/*' element={<Messenger/>}/>
                    <Route path='/users' element={<Users/>}/>
                </Routes>
            </div>
        </div>
    )
}
export default App;