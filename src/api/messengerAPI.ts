import {WSMessagesType} from "../types/types";

type SubscriberType = (messages: WSMessagesType[]) => void

let subscribers = [] as SubscriberType[]
let ws: WebSocket

const closeChannel = () => {
    console.log('Channel closed')
    setTimeout(createChannel, 5000)
}

const traceMessages = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers.forEach(s=>s(newMessages))
}

const createChannel = () => {
    ws?.removeEventListener('close', closeChannel)
    ws?.close() // closing tunnel to prevent leaking
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeChannel)
}

export const messengerAPI = {
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    }
}
