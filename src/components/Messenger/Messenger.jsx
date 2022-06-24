import c from './Messenger.module.scss'
import User from "./User/User";
import Message from "./Message/Messsage";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, writeMessage} from "../../redux/messengerReducer";
import withRedirect from "../../hoc/withRedirect";

const Messenger = () => {
    const dispatch = useDispatch()
    const messengerPage = useSelector(s => s.messengerPage)

    const dialogsElements = messengerPage.dialogsData.map(user => <User name={user.name} id={user.id} key={user.id}/>)
    const messageElements = messengerPage.messagesData.map(message => <Message message={message.message}
                                                                               id={message.id} key={message.id}/>)
    const newMessage = React.createRef()

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

const MessengerWithRedirect = withRedirect(Messenger)

export default MessengerWithRedirect