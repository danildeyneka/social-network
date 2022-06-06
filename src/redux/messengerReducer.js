const ADD_MESSAGE = 'WRITE-MESSAGE'
const WRITE_MESSAGE = 'ADD-MESSAGE'

const messengerReducer = (state, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: 6,
                message: state.newMessage // ???????????????????
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