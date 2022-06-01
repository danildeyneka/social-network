import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Messenger from "./components/Messenger/Messenger";
import {BrowserRouter, Routes, Route} from "react-router-dom";


const App = (props) => {
    return (<BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper__content'>
                    <Routes>
                        <Route path='/profile'
                               element={<Profile profilePage={props.state.profilePage} addPost={props.addPost}/>}/>
                        <Route path='/messenger/*'
                               element={<Messenger messengerPage={props.state.messengerPage}/>}/>
                        {/*<Route path='/' element={<App/>}/>*/}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>);
}
export default App;
