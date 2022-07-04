const SEND_MESSAGE = 'messenger/SEND_MESSAGE'

const initialState = {
    dialogsData: [
        {id: 1, name: 'Саша'},
        {id: 2, name: 'Маша'},
        {id: 3, name: 'Ваня'},
        {id: 4, name: 'Артур'},
        {id: 5, name: 'Миша'},
        {id: 6, name: 'Слава'},
    ],
    messagesData: [
        {id: 1, message: 'Hello React'},
        {id: 2, message: 'Its cool'},
        {id: 3, message: 'ads'},
        {id: 4, message: 'f3w3'},
        {id: 5, message: 'lorem'}
    ]
}

const messengerReducer = (state = initialState, action) => {
    switch (action.type) {

        case SEND_MESSAGE:
            let newMessage = action.newMessage
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: newMessage}]
            }

        default:
            return state
    }
}

export const sendMessage = (newMessage) => ({type: SEND_MESSAGE, newMessage})

export default messengerReducer