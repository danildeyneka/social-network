import {FC, useEffect, useState} from "react";
import {WSMessagesType} from "../../../types/types";
import {Message} from "./Message/Message";

export const Messages: FC<{ wsChannel: WebSocket | null }> = (props) => {
    const [messages, setMessages] = useState<WSMessagesType[]>([])

    useEffect(() => {
        const traceMessages = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages(state => [...state, ...newMessages])
        }
        props.wsChannel?.addEventListener('message', traceMessages)
        return () => {
            props.wsChannel?.removeEventListener('message', traceMessages)
        }
    }, [props.wsChannel])

    return <>
        <div style={{height: 400, overflowY: "auto"}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    </>
}