import './App.scss';
// import Header from './components/Header/Header';
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

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import Sider from "antd/lib/layout/Sider";
import 'antd/dist/antd.css';
const {Content, Footer, Header} = Layout

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

    return <Layout>

        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}/>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                        }}
                    />
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
                </Content>
            </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Social network ©2022 Created by Danil Deyneka</Footer>

        {/*<Header></Header>*/}
        {/*<Header/>*/}
        {/*<Navbar/>*/}



    </Layout>

}

export default App;