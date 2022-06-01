import c from './Navbar.module.scss'
// import SingleLink from './SingleLink/SingleLink'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav>
        <div className={c.item}>
            <NavLink to='/Profile' className={(nav) => nav.isActive ? c.active : ''}> Profile </NavLink>
        </div>
        <div className={c.item}>
            <NavLink to='/Messenger' className={(nav) => nav.isActive ? c.active : ''}> Messenger </NavLink>
        </div>
    </nav>
}

export default Navbar