import React, {FC, useEffect, useState} from 'react'
import {useAppDispatch} from '../../../hooks/hooks'
import {sendMessage} from '../../../redux/messengerReducer'

export const MessageForm: FC = () => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useAppDispatch()
    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    useEffect(() => {
        setStatus('ready')
        return () => setStatus('pending')
    }, [status])

    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button disabled={status === 'pending'} onClick={sendMessageHandler}>Send</button>
        </div>
    </>
}