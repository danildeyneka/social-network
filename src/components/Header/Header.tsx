import c from './Header.module.scss'
import {NavLink} from "react-router-dom";
import {logOut} from "../../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FC} from "react";
import {selectIsAuth} from "../../redux/selectors/authSelectors";


const Header: FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(logOut())
    }

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