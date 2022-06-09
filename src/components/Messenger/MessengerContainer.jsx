import {addNewMessageActionCreator, writeNewMessageActionCreator} from '../../redux/messengerReducer'
import Messenger from "./Messenger";

const MessengerContainer = (props) => {
    const state = props.store.getState().messengerPage

    const onMessageChange = (text) => { // обращение к полю ввода напрямую (в myPosts по-другому)
        props.store.dispatch(writeNewMessageActionCreator(text))
    }

    const addMessage = () => {
        props.store.dispatch(addNewMessageActionCreator())
    }

    return (
        <Messenger
            dialogsData={state.dialogsData}
            messagesData={state.messagesData}
            newMessage={state.newMessage}
            writeNewMessage={onMessageChange}
            addNewMessage={addMessage}
        />
    )
}

export default MessengerContainer