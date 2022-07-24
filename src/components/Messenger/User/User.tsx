import c from './../Messenger.module.scss'
import {NavLink} from "react-router-dom";
import {FC} from "react";

type PropsType = {
    name: string
    id: number
}
const User: FC<PropsType> = (props) => {
    return (
        <div className={c.dialogs__item + c.active}>
            <NavLink to={"/messenger/" + props.id}> {props.name} </NavLink>
        </div>
    )
}

export default User