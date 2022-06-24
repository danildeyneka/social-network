import {useSelector} from "react-redux";
import Login from "../components/Login/Login";

const withRedirect = (Component) => {
    function RouterComponent(props) {
        const isAuth = useSelector(s => s.auth.isAuth)
        if (!isAuth) {
            return <Login/>
        }
        return (
            <Component {...props}/>
        )
    }

    return RouterComponent
}

export default withRedirect