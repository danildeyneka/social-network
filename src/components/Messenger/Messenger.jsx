import c from './Messenger.module.scss'
import User from "./User/User";
import Message from "./Message/Messsage";
import React from "react";
import {addNewMessageActionCreator, writeNewMessageActionCreator} from '../../redux/messengerReducer'

const Messenger = (props) => {

    const dialogsElements = props.messengerPage.dialogsData.map(user => <User name={user.name} id={user.id}/>)
    const messageElements = props.messengerPage.messagesData.map(message => <Message message={message.message}
                                                                                     id={message.id}/>)

    const newMessage = React.createRef()

    const onMessageChange = (e) => { // обращение к полю ввода напрямую (в myPosts по-другому)
        let text = e.target.value
        props.dispatch(writeNewMessageActionCreator(text))
    }

    const addMessage = () => {
        props.dispatch(addNewMessageActionCreator())
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
                value={props.messengerPage.newMessage}
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