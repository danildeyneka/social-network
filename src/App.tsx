import './App.scss';
import {AppHeader} from './components/Header/Header';
import ProfileWithRedirect from './components/Profile/Profile';
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {initApp} from "./redux/authReducer";
import {FC, useEffect} from "react";
import Preloader from "./components/common/Preloader/Preloader";
import React from "react";
import LoginWithRedirect from "./components/Login/Login";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {selectInit} from "./redux/selectors/authSelectors";
import {Layout, Menu} from 'antd';
import {siderMenuItems} from "./utils/ant-design/antd";

const {Content, Footer, Sider} = Layout

const LazyUsers = React.lazy(() => import('./components/Users/Users'))
const LazyMessengerWithRedirect = React.lazy(()=> import('./components/Messenger/Messenger'))
const App: FC = () => {
    const dispatch = useAppDispatch()
    const catchAllErrors = () => {
        alert('some error occurred')
    }

    useEffect(() => {
        dispatch(initApp())
        window.addEventListener('unhandledrejection', catchAllErrors)
        return () => {
            window.removeEventListener('unhandledrejection', catchAllErrors)
        }
    }, [])

    const init = useAppSelector(selectInit)
    if (!init) return <Preloader/>

    return <Layout>
        <AppHeader/>
        <Content style={{padding: '0 50px'}}>
            <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        // defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        style={{height: '100%'}}
                        items={siderMenuItems}
                    />
                </Sider>
                <Content style={{padding: '0 24px', minHeight: 280}}>
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path='/profile/:userId' element={<ProfileWithRedirect/>}/>
                            <Route path='/profile/' element={<ProfileWithRedirect/>}/>
                            <Route path='/messenger/*' element={<LazyMessengerWithRedirect/>}/>
                            <Route path='/users' element={<LazyUsers/>}/>
                            <Route path='/login' element={<LoginWithRedirect/>}/>
                            <Route path='*' element={<Navigate to='/profile'/>}
                            />
                        </Routes>
                    </React.Suspense>
                </Content>
            </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Social network ©2022 Created by Danil Deyneka</Footer>
    </Layout>
}

export default App;