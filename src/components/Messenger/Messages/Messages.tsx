import {FC, useEffect, useState} from "react";
import {WSMessagesType} from "../../../types/types";
import {Message} from "./Message/Message";

export const Messages: FC<{ ws: WebSocket | null }> = (props) => {
    const [messages, setMessages] = useState<WSMessagesType[]>([])

    useEffect(() => {
        const traceMessages = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages(state => [...state, ...newMessages])
        }
        props.ws?.addEventListener('message', traceMessages)
        return () => {
            props.ws?.removeEventListener('message', traceMessages)
        }
    }, [props.ws])

    return <>
        <div style={{height: 400, overflowY: "auto"}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    </>
}