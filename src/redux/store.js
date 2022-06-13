// import profileReducer from "./profileReducer";
// import messengerReducer from "./messengerReducer";
//
// let store = {
//     _state: { // изначальная БД (хардкод). группировка по страницам
//         profilePage: { // все что внутри - initial state для profileReducer, первоначальная загрузка БД
//             postData: [
//                 {id: 1, message: 'Hi there', likesCount: 4},
//                 {id: 2, message: 'Hi e3dq', likesCount: 6},
//                 {id: 3, message: 'Hi 23213', likesCount: 11},
//                 {id: 4, message: 'Hi', likesCount: 2},
//             ],
//             newPost: 'Введите текст',
//         },
//         messengerPage: {
//             dialogsData: [
//                 {id: 1, name: 'Саша'},
//                 {id: 2, name: 'Маша'},
//                 {id: 3, name: 'Ваня'},
//                 {id: 4, name: 'Артур'},
//                 {id: 5, name: 'Миша'},
//                 {id: 6, name: 'Слава'},
//             ],
//             messagesData: [
//                 {id: 1, message: 'Hello React'},
//                 {id: 2, message: 'Its cool'},
//                 {id: 3, message: 'ads'},
//                 {id: 4, message: 'f3w3'},
//                 {id: 5, message: 'lorem'}
//             ],
//             newMessage: 'Введите сообщение'
//         }
//     },
//     // _callSubscriber() {
//     //     console.log('ssss')
//     // },
//
//     getState() { // геттер - мы не можем обращатсья напрямую к _state. _ это индикатор неприкосновенности к внешнему миру
//         return this._state
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer
//     },
//
//     dispatch(action) { // { type: 'add-post' }
//
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.messengerPage = messengerReducer(this._state.messengerPage, action)
//
//         this._callSubscriber(this._state)
//     }
// }
//
// export default store
// window.store = store