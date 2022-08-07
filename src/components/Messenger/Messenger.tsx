import {FC, useEffect, useState} from "react";
import withRedirect from "../../hoc/withRedirect";
import {Messages} from "./Messages/Messages";
import {MessageForm} from "./MessageForm/MessageForm";

const Messenger: FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(()=>{

    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <MessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const MessengerWithRedirect = withRedirect(Messenger)
export default MessengerWithRedirect