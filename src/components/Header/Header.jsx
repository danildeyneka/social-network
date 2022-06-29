import c from './Header.module.scss'
import {NavLink} from "react-router-dom";
import {useEffect} from "react";
import {getAuthUserData, logOut} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const isAuth = useSelector(s => s.auth.isAuth)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logOut())
    }

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [])

    return <header className={c.header}>
        <img alt='logo' src='https://png.pngtree.com/element_pic/16/11/02/bd886d7ccc6f8dd8db17e841233c9656.jpg'></img>
        <div className={c.login}>
            {isAuth
                ? <button onClick={() => logout()}>Logout</button>
                : <NavLink className={(nav) => nav.isActive ? c.active : ''} to='/login'>Login</NavLink>
            }
        </div>
    </header>
}

export default Header