const WRITE_POST = 'UPDATE-NEW-POST'
const ADD_POST = 'WRITE-POST'

const profileReducer = (state, action) => {
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
//  state = сам редьюсер того компонента. сейчас state = profilePage

// if (action.type === ADD_POST) {
//     const newPost = {
//         id: 5, // хардкод
//         message: this._state.profilePage.newPost, // ловим сообщение из textarea, записанное в стейт
//         likesCount: 0
//     }
//     this._state.profilePage.postData.push(newPost) // добавление поста в стейт
//     this._state.profilePage.newPost = '' // очистка поля ввода после добавления поста
//     this._callSubscriber(this._state)
//
// } else if (action.type === WRITE_POST) {
//     this._state.profilePage.newPost = action.newPost
//     this._callSubscriber(this._state)
// }