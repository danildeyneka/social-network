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
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('fasfsa')
    },
    addPost() {
        const newPost = {
            id: 5, // хардкод
            message: this._state.profilePage.newPost, // ловим сообщение из textarea, записанное в стейт
            likesCount: 0
        }
        this._state.profilePage.postData.push(newPost) // добавление поста в стейт
        this._state.profilePage.newPost = '' // очистка поля ввода после добавления поста
        this._callSubscriber(this._state);
    },
    updateNewPost(newMessage) {
        this._state.profilePage.newPost = newMessage
        this._callSubscriber(this._state)
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

}

export default store
window.store = store