import c from './../Messenger.module.scss'
import {NavLink} from "react-router-dom";

const User = (props) => {
    return (
        <div className={c.dialogs__item + c.active}>
            <NavLink to={"/messenger/" + props.id}> {props.name} </NavLink>
        </div>
    )
}

export default User