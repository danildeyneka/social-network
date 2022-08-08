import React, {FC} from 'react'
import {WSMessagesType} from '../../../../types/types'
import initialAvatar from '../../../../assets/images/avatar.png'
import {NavLink} from 'react-router-dom'

export const Message: FC<{ message: WSMessagesType }> = React.memo(({message}) => {

    return <>
        <NavLink to={`/profile/${message.userId}`}>
            <img alt="avatar" src={message.photo ?? initialAvatar} style={{width: 60, borderRadius: 15}}/>
        </NavLink>
        <b>{message.userName}</b>
        <div>{message.message}</div>
    </>
})