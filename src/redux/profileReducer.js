const WRITE_POST = 'UPDATE-NEW-POST'
const ADD_POST = 'WRITE-POST'
const initialState = {
    postData: [
        {id: 1, message: 'Hi there', likesCount: 4},
        {id: 2, message: 'Hi e3dq', likesCount: 6},
        {id: 3, message: 'Hi 23213', likesCount: 11},
        {id: 4, message: 'Hi', likesCount: 2},
    ],
    newPost: 'Введите текст',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 5, // хардкод
                message: state.newPost, // ловим сообщение из textarea, записанное в стейт
                likesCount: 0
            }
            state.postData.push(newPost) // добавление поста в стейт
            state.newPost = '' // очистка поля ввода после добавления поста
            return state

        case WRITE_POST:
            state.newPost = action.newPost
            return state

        default:
            return state
    }
}

export const writeNewPostActionCreator = (text) => ({type: WRITE_POST, newPost: text})

export const addNewPostActionCreator = () => ({type: ADD_POST}) // return опускается, а объект заворачивается в скобки

export default profileReducer

// если бы мы не использовали редьюсер, такой код был бы в store.dispatch
//  state - это редьюсер того компонента. сейчас state = profilePage

// if (action.type === ADD_POST) {
//     const newPost = {
//         id: 5, // хардкод
//         message: this._state.profilePage.newPost,
//         likesCount: 0
//     }
//     this._state.profilePage.postData.push(newPost)
//     this._state.profilePage.newPost = ''
//     this._callSubscriber(this._state)
//
// } else if (action.type === WRITE_POST) {
//     this._state.profilePage.newPost = action.newPost
//     this._callSubscriber(this._state)
// }