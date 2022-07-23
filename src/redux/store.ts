import profileReducer from "./profileReducer";
import messengerReducer from "./messengerReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    usersPage: usersReducer,
    auth: authReducer
})
const store = configureStore({
    reducer: rootReducer
    // middleware: thunk - added by default in rtk
})

type RootReducerType = typeof rootReducer
export type RootState = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch

export default store

// const reducer = combineReducers({ // but from redux (same)
//     profilePage: profileReducer,
//     messengerPage: messengerReducer,
//     usersPage: usersReducer,
//     auth: authReducer
// })
// let store = legacy_createStore(rootReducer, applyMiddleware(thunk))