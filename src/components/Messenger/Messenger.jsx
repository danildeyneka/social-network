import c from './Messenger.module.scss'
import User from "./User/User";
import Message from "./Message/Messsage";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, writeMessage} from "../../redux/messengerReducer";
import {useNavigate} from "react-router-dom";

const Messenger = () => {
    const dispatch = useDispatch()
    const messengerPage = useSelector(s => s.messengerPage)
    const isAuth = useSelector(s=>s.auth.isAuth)
    const navigate = useNavigate()

    const dialogsElements = messengerPage.dialogsData.map(user => <User name={user.name} id={user.id} key={user.id}/>)
    const messageElements = messengerPage.messagesData.map(message => <Message message={message.message}
                                                                               id={message.id} key={message.id}/>)
    const newMessage = React.createRef()

    useEffect(() => {
        if (!isAuth) {
            return navigate('/login')
        }
    }, [isAuth])

    return (
        <div className={c.dialogs}>
            <div className={c.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={c.messages}>
                {messageElements}
            </div>
            <textarea
                className={c.textarea}
                ref={newMessage}
                value={messengerPage.newMessage}
                onChange={(e)=>dispatch(writeMessage(e.target.value))}/>
            <button
                className={c.button}
                onClick={() => dispatch(addMessage())}>
                <span>Send</span>
            </button>
        </div>
    )
}

export default Messenger