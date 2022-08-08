import {WSMessagesType} from '../types/types'

type SubscriberType = (messages: WSMessagesType[]) => void

let subscribers = [] as SubscriberType[]
let ws: WebSocket | null

const closeChannel = () => {
    console.log('Channel closed')
    setTimeout(createChannel, 5000)
}
const traceMessages = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}
const cleanUp = () => {
    subscribers = []

    ws?.removeEventListener('close', closeChannel)
    ws?.removeEventListener('message', traceMessages)
    ws?.close()
}
const createChannel = () => {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeChannel)
    ws.addEventListener('message', traceMessages)
}

export const messengerAPI = {
    start() {
        createChannel()
    },
    stop() {
        cleanUp()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: SubscriberType) {
        subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}
