import {FC} from "react";
import {WSMessagesType} from "../../../../types/types";

export const Message: FC<{ message: WSMessagesType }> = ({message}) => {

    return <>
        <img alt="avatar" src={message.photo} style={{width: 30}}/>
        <b>{message.userName}</b>
        <div>{message.message}</div>
    </>
}