import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ProfileWithRedirect from './components/Profile/Profile';
import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {initApp} from "./redux/authReducer";
import {useEffect} from "react";
import Preloader from "./components/common/Preloader/Preloader";
import React from "react";
import MessengerWithRedirect from "./components/Messenger/Messenger";
import LoginWithRedirect from "./components/Login/Login";
// const LazyMessengerWithRedirect = React.lazy(() => import('./components/Messenger/Messenger')) // lazy-loading

// в бандл первой загрузки приложения не попадают lazy компоненты, а грузятся после перехода на них
// import Users from "./components/Users/Users";
const LazyUsers = React.lazy(() => import('./components/Users/Users'))

const App = () => {
    const dispatch = useDispatch()
    const catchAllErrors = () => {
        alert('some error occurred')
    }

    useEffect(() => { // componentWillMount
        dispatch(initApp())
        window.addEventListener('unhandledrejection', catchAllErrors)
        return () => { // componentWillUnmount
            window.removeEventListener('unhandledrejection', catchAllErrors)
        }
    }, [dispatch]) // componentWillUpdate

    const init = useSelector(s => s.auth.init)
    if (init === false) return <Preloader/>

    return <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className='app-wrapper__content'
            // заворачиваем ту часть, где будут меняться страницы в роуты - а сам навбар для роутов выше
        >
            <React.Suspense fallback={<Preloader/>}>
                <Routes>
                    <Route path='/profile/:userId' element={<ProfileWithRedirect/>}/>
                    <Route path='/profile/' element={<ProfileWithRedirect/>}/>
                    <Route path='/messenger/*' element={<MessengerWithRedirect/>}/>
                    <Route path='/users' element={<LazyUsers/>}/>
                    <Route path='/login' element={<LoginWithRedirect/>}/>
                    <Route path='*' element={<Navigate to='/profile'/>}
                    />
                </Routes>
            </React.Suspense>
        </div>
    </div>

}

export default App;