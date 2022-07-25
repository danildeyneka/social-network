import LoginForm from "./LoginForm";
import c from './Login.module.scss'
import Profile from "../Profile/Profile";
import {useAppSelector} from "../../hooks/hooks";
import {FC} from "react";

const Login: FC = () => {

    return <>
        <h1>Login</h1>
        <LoginForm/>
    </>
}

// @ts-ignore
const withRedirect = (Component) => {
    function RouterComponent(props: JSX.IntrinsicAttributes) { // ??
        const isAuth = useAppSelector(s => s.auth.isAuth)
        if (isAuth) return <Profile/>
        return <Component {...props}/>
    }
    return RouterComponent
}
const LoginWithRedirect = withRedirect(Login)

export default LoginWithRedirect
