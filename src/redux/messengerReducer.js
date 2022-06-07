const ADD_MESSAGE = 'WRITE-MESSAGE'
const WRITE_MESSAGE = 'ADD-MESSAGE'
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
        case ADD_MESSAGE:
            const newMessage = {
                id: 6,
                message: state.newMessage
            }
            state.messagesData.push(newMessage)
            state.newMessage = ''
            return state

        case WRITE_MESSAGE:
            state.newMessage = action.newMessage
            return state

        default:
            return state
    }
}

export const writeNewMessageActionCreator = (text) => ({type: WRITE_MESSAGE, newMessage: text})

export const addNewMessageActionCreator = () => ({type: ADD_MESSAGE})

export default messengerReducer