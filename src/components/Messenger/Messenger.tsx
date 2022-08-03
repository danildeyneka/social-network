import {FC, useEffect, useState} from "react";
import withRedirect from "../../hoc/withRedirect";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
type WSMessagesType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Messenger: FC = () => {

    return (
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    )
}

const Messages: FC = () => {
    const [messages, setMessages] = useState<WSMessagesType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages(state => [...state, ...newMessages])
        })
    }, [])

    return <>
        <div style={{height: 400, overflowY: "auto"}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    </>
}

const Message: FC<{ message: WSMessagesType }> = ({message}) => {

    return <>
        <img alt="avatar" src={message.photo} style={{width: 30}}/>
        <b>{message.userName}</b>
        <div>{message.message}</div>
    </>
}

const AddMessage: FC = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        debugger
        if (!message) return
        ws.send(message)
        setMessage('')
    }

    return <>
        <div>
            <textarea onChange={(e)=>setMessage(e.currentTarget.value.trim())} value={message}/>
        </div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    </>
}


const MessengerWithRedirect = withRedirect(Messenger)
export default MessengerWithRedirect