import c from './Messenger.module.scss'
import User from "./User/User";
import Message from "./Message/Messsage";
import React from "react";

const Messenger = (props) => {

    const dialogsElements = props.dialogsData.map(user => <User name={user.name} id={user.id}/>)
    const messageElements = props.messagesData.map(message => <Message message={message.message}
                                                                                     id={message.id}/>)
    const newMessage = React.createRef()

    const onMessageChange = (e) => {
        let text = e.target.value
        props.writeNewMessage(text)
    }

    const addMessage = () => {
        props.addNewMessage()
    }

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
                value={props.newMessage}
                onChange={onMessageChange}/>
            <button
                className={c.button}
                onClick={addMessage}>
                <span>Send</span>
            </button>
        </div>
    )
}

export default Messenger