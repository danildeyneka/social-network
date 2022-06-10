import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Routes, Route} from "react-router-dom";
import Messenger from "./components/Messenger/Messenger";

const App = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper__content'>
                <Routes>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/messenger/*' element={<Messenger/>}/>
                    {/*<Route path='/' element={<App/>}/>*/}
                </Routes>
            </div>
        </div>
    )
}
export default App;