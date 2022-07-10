import LoginForm from "./LoginForm";
import c from './Login.module.scss'
import {useSelector} from "react-redux";
import Profile from "../Profile/Profile";

const Login = () => {

    return <>
        <h1>Login</h1>
        <LoginForm/>
    </>
}

const withRedirect = (Component) => {
    function RouterComponent(props) {
        const isAuth = useSelector(s => s.auth.isAuth)
        if (isAuth) return <Profile/>
        return <Component {...props}/>
    }
    return RouterComponent
}
const LoginWithRedirect = withRedirect(Login)

export default LoginWithRedirect
