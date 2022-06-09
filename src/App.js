import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Routes, Route} from "react-router-dom";
import MessengerContainer from "./components/Messenger/MessengerContainer";

const App = (props) => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper__content'>
                <Routes>
                    <Route path='/profile' element={
                        <Profile
                            store={props.store}
                        />}/>
                    <Route path='/messenger/*' element={
                        <MessengerContainer
                            store={props.store}
                        />}/>
                    {/*<Route path='/' element={<App/>}/>*/}
                </Routes>
            </div>
        </div>
    )
}
export default App;