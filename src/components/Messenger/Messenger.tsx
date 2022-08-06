import {FC, useEffect, useState} from "react";
import withRedirect from "../../hoc/withRedirect";
import {Messages} from "./Messages/Messages";
import {MessageForm} from "./MessageForm/MessageForm";

const Messenger: FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(()=>{
        let ws: WebSocket
        const closeChannel = () => {
            console.log('Channel closed')
            setTimeout(createChannel, 5000)
        }
        const createChannel = () => {
            ws?.removeEventListener('close', closeChannel)
            ws?.close()             // убираем ивент с убитого канала (при сбое инета)
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeChannel)
            setWsChannel(ws) // непосредственное создание туннеля
        }
        createChannel()

        return () => { // при демонтировании компонента чистим ивенты и закрываем туннель
            ws.removeEventListener('close', closeChannel)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages ws={wsChannel}/>
            <MessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const MessengerWithRedirect = withRedirect(Messenger)
export default MessengerWithRedirect