const ADD_MESSAGE = 'WRITE_MESSAGE'
const WRITE_MESSAGE = 'ADD_MESSAGE'

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
    ],
    newMessage: 'Введите сообщение'
}

const messengerReducer = (state = initialState, action) => {
    switch (action.type) {
        case WRITE_MESSAGE:
            return {
            ...state,
            newMessage: action.newMessage
            }

        case ADD_MESSAGE:
            let newMessage = state.newMessage
            return {
                ...state,
                newMessage: '',
                messagesData: [...state.messagesData, {id: 6, message: newMessage}]
            }

        default:
            return state
    }
}

export const writeMessage = (text) => ({type: WRITE_MESSAGE, newMessage: text})
export const addMessage = () => ({type: ADD_MESSAGE})

export default messengerReducer