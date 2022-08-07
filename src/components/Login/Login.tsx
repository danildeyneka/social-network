import LoginForm from "./LoginForm";
import c from './Login.module.scss'
import Profile from "../Profile/Profile";
import {useAppSelector} from "../../hooks/hooks";
import React, {FC} from "react";

export const Login: FC = () => {

    return <>
        <h1>Login</h1>
        <LoginForm/>
    </>
}

function withRedirect<RC> (Component: React.ComponentType<RC>) {
    function RouterComponent(props: RC) {
        const isAuth = useAppSelector(s => s.auth.isAuth)
        if (isAuth) return <Profile/>
        return <Component {...props}/>
    }
    return RouterComponent
}
const LoginWithRedirect = withRedirect(Login)

export default LoginWithRedirect
