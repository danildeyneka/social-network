import {rerenderDOM} from "../render";

const state = {
    profilePage: {
        postData: [
            {id: 1, message: 'Hi there', likesCount: 4},
            {id: 2, message: 'Hi dasdqwdqdwd3dq', likesCount: 6},
            {id: 3, message: 'Hi 23213', likesCount: 11},
            {id: 4, message: 'Hi', likesCount: 2},
        ],
        newPostText: 'Введите текст',
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

export const addPost = (postMessage) => {
    const newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    }
    state.profilePage.postData.push(newPost)
    rerenderDOM(state);
}

export default state