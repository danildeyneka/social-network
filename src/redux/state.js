let rerenderDOM = () => {
    console.log('fasfsa')
}

let state = { // изначальная БД (хардкод). группировка по страницам
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
}

export const addPost = () => {
    const newPost = {
        id: 5, // хардкод
        message: state.profilePage.newPost, // ловим сообщение из textarea, записанное в стейт
        likesCount: 0
    }
    state.profilePage.postData.push(newPost) // добавление поста в стейт
    state.profilePage.newPost = '' // очистка поля ввода после добавления поста
    rerenderDOM(state);
}

export const updateNewPost = (newMessage) => {
    state.profilePage.newPost = newMessage
    rerenderDOM(state)
}

export const subscribe = (observer) => {
    rerenderDOM = observer
}

export default state