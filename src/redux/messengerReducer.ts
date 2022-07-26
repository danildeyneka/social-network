type DialogsDataType = {
    id: number
    name: string
}
type MessagesDataType = {
    id: number
    message: string
}

const initialState = {
    dialogsData: [
        {id: 1, name: 'Саша'},
        {id: 2, name: 'Маша'},
        {id: 3, name: 'Ваня'},
        {id: 4, name: 'Артур'},
        {id: 5, name: 'Миша'},
        {id: 6, name: 'Слава'},
    ] as Array<DialogsDataType>,
    messagesData: [
        {id: 1, message: 'Hello React'},
        {id: 2, message: 'Its cool'},
        {id: 3, message: 'ads'},
        {id: 4, message: 'f3w3'},
        {id: 5, message: 'lorem'}
    ] as Array<MessagesDataType>,
    newMessage : ''
}

export type InitialStateType = typeof initialState

const messengerReducer = (state = initialState, action: SendMessageType): InitialStateType => {
    switch (action.type) {

        case 'SEND_MESSAGE':
            let newMessage = action.newMessage
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: newMessage}]
            }

        default:
            return state
    }
}

type SendMessageType = {
    type: 'SEND_MESSAGE'
    newMessage: string
}
export const sendMessage = (newMessage: string): SendMessageType => ({type: 'SEND_MESSAGE', newMessage})

export default messengerReducer