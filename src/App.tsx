import './App.scss';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ProfileWithRedirect from './components/Profile/Profile';
import {Navigate, Route, Routes} from "react-router-dom";
import {initApp} from "./redux/authReducer";
import {FC, useEffect} from "react";
import Preloader from "./components/common/Preloader/Preloader";
import React from "react";
import MessengerWithRedirect from "./components/Messenger/Messenger";
import LoginWithRedirect from "./components/Login/Login";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {selectInit} from "./redux/selectors/authSelectors";

const LazyUsers = React.lazy(() => import('./components/Users/Users'))
const App: FC = () => {
    const dispatch = useAppDispatch()
    const catchAllErrors = () => {
        alert('some error occurred')
    }

    useEffect(() => { // componentDidMount
        dispatch(initApp())
        window.addEventListener('unhandledrejection', catchAllErrors)
        return () => { // componentWillUnmount
            window.removeEventListener('unhandledrejection', catchAllErrors)
        }
    }, [dispatch]) // componentDidUpdate

    const init = useAppSelector(selectInit)
    if (!init) return <Preloader/>

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