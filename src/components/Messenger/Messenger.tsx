import c from './Messenger.module.scss'
import User from "./User/User";
import Message from "./Message/Messsage";
import withRedirect from "../../hoc/withRedirect";
import NewMessageForm from "./NewMessageForm";
import {useAppSelector} from "../../hooks/hooks";
import {selectDialogsData, selectMessagesData} from "../../redux/selectors/messengerSelectors";
import {FC} from "react";

const Messenger: FC = () => {
    const messagesData = useAppSelector(selectMessagesData)
    const dialogsData = useAppSelector(selectDialogsData)

    const dialogsElements = dialogsData.map(user => <User name={user.name} id={user.id} key={user.id}/>)
    const messageElements = messagesData.map(message => <Message message={message.message} key={message.id}/>)

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