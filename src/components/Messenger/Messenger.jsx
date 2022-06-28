import c from './Messenger.module.scss'
import User from "./User/User";
import Message from "./Message/Messsage";
import {useSelector} from "react-redux";
import withRedirect from "../../hoc/withRedirect";
import NewMessageForm from "./NewMessageForm";

const Messenger = () => {
    const messengerPage = useSelector(s => s.messengerPage)

    const dialogsElements = messengerPage.dialogsData.map(user => <User name={user.name} id={user.id} key={user.id}/>)
    const messageElements = messengerPage.messagesData.map(message => <Message message={message.message}
                                                                               id={message.id} key={message.id}/>)

    return (
        <div className={c.dialogs}>
            <div className={c.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={c.messages}>
                {messageElements}
            </div>
            <NewMessageForm/>
        </div>
    )
}

const MessengerWithRedirect = withRedirect(Messenger)

export default MessengerWithRedirect