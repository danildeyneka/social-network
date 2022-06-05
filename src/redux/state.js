const UPDATE_NEW_POST = 'UPDATE-NEW-POST'
const ADD_POST = 'ADD-POST'

let store = {
    _state: { // изначальная БД (хардкод). группировка по страницам
        profilePage: {
            postData: [
                {id: 1, message: 'Hi there', likesCount: 4},
                {id: 2, message: 'Hi dasdqwdqdwd3dq', likesCount: 6},
                {id: 3, message: 'Hi 23213', likesCount: 11},
                {id: 4, message: 'Hi', likesCount: 2},
            ],
            newPost: 'Введите текст',
        },
        messengerPage: {
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
                {id: 3, message: 'adsdad'},
                {id: 4, message: 'f3w3'},
                {id: 5, message: 'lorem'}
            ]
        }
    },
    _callSubscriber() {
        console.log('fasfsa')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) { // { type: 'add-post' }
        if (action.type === ADD_POST) {
            const newPost = {
                id: 5, // хардкод
                message: this._state.profilePage.newPost, // ловим сообщение из textarea, записанное в стейт
                likesCount: 0
            }
            this._state.profilePage.postData.push(newPost) // добавление поста в стейт
            this._state.profilePage.newPost = '' // очистка поля ввода после добавления поста
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST) {
            this._state.profilePage.newPost = action.newMessage
            this._callSubscriber(this._state)
        }
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST,
        newMessage: text
    }
}

export default store
window.store = store