import {FC, useEffect} from 'react'
import withRedirect from '../../hoc/withRedirect'
import {Messages} from './Messages/Messages'
import {MessageForm} from './MessageForm/MessageForm'
import {useAppDispatch} from '../../hooks/hooks'
import {startMessagesListening, stopMessagesListening} from '../../redux/messengerReducer'

const Messenger: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => dispatch(stopMessagesListening())
    }, [])

    return (
        <div>
            <Messages/>
            <MessageForm/>
        </div>
    )
}

const MessengerWithRedirect = withRedirect(Messenger)
export default MessengerWithRedirect