import c from './Navbar.module.scss'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav>
        <div className={c.item}>
            <NavLink to='/profile' className={(nav) => nav.isActive ? c.active : ''}> Profile </NavLink>
        </div>
        <div className={c.item}>
            <NavLink to='/messenger' className={(nav) => nav.isActive ? c.active : ''}> Messenger </NavLink>
        </div>
        <div className={c.item}>
            <NavLink to='/users' className={(nav) => nav.isActive ? c.active : ''}> Users </NavLink>
        </div>
    </nav>
}

export default Navbar