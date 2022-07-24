import c from './../Messenger.module.scss'
import {FC} from "react";

type PropsType = {
    message: string
}
const Message: FC<PropsType> = (props) => {

    return (<div>
        <div className={c.messages__item}>
            <div>
                {props.message}
            </div>
        </div>
    </div>);
};

export default Message