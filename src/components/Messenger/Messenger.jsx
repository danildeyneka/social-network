import c from './Messenger.module.scss'
import User from "./User/User";
import Message from "./Message/Messsage";
import React from "react";

const Messenger = (props) => {

    const dialogsElements = props.messengerPage.dialogsData.map( user => <User name={user.name} id={user.id}/>)
    const messageElements = props.messengerPage.messagesData.map( message => <Message message={message.message} id={message.id}/> )

    const newMessage = React.createRef()

    const sendMessage = () => {
        const text = newMessage.current.value
        alert(text)
    }

    return (
        <div className={c.dialogs}>
            <div className={c.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={c.messages}>
                {messageElements}
            </div>
            <textarea className={c.textarea} ref={newMessage}></textarea>
            <button className={c.button} onClick={sendMessage}><span>Send</span></button>
        </div>
    )
}

export default Messenger