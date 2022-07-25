import Login from "../components/Login/Login";
import {useAppSelector} from "../hooks/hooks";
import {selectIsAuth} from "../redux/authSelectors";

const withRedirect = (Component) => {
    function RouterComponent(props) {
        const isAuth = useAppSelector(selectIsAuth)

        if (!isAuth) return <Login/>

        return <Component {...props}/>
    }

    return RouterComponent
}

export default withRedirect