import React, {FC, useEffect, useRef, useState} from 'react'
import {Message} from './Message/Message'
import {useAppSelector} from '../../../hooks/hooks'
import {selectMessages} from '../../../redux/selectors/messengerSelectors'

export const Messages: FC = () => {
    const messages = useAppSelector(selectMessages)
    const anchor = useRef<HTMLDivElement>(null)
    const [autoscroll, setAutoscroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const el = e.currentTarget
        if (Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight) < 50) setAutoscroll(true)
        else setAutoscroll(false)
    }

    useEffect(() => {
        if (autoscroll) anchor.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    return <>
        <div style={{height: 400, overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
            <div ref={anchor}></div>
        </div>
    </>
}