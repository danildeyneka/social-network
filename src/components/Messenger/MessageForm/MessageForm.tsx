import {FC, useEffect, useState} from "react";

export const MessageForm: FC<{wsChannel: WebSocket | null}> = (props) => {
    const [channelOpened, setChannelOpened] = useState(false)
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) return
        props.wsChannel?.send(message)
        setMessage('')
    }

    useEffect(() => {
        props.wsChannel?.addEventListener('open', ()=>{
            setChannelOpened(true)
        })
    }, [])

    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button disabled={channelOpened} onClick={sendMessage}>Send</button>
        </div>
    </>
}