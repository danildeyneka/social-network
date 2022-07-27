import Login from "../components/Login/Login";
import {useAppSelector} from "../hooks/hooks";
import {selectIsAuth} from "../redux/authSelectors";
import React from "react";

function withRedirect<RC> (Component: React.ComponentType<RC>) {
    function RouterComponent(props: RC) {
        const isAuth = useAppSelector(selectIsAuth)

        if (!isAuth) return <Login/>

        return <Component {...props}/>
    }

    return RouterComponent
}

export default withRedirect