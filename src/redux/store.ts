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

export type InferActionTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
// infer creates type by itself for action object (T) in reducers, taking its keys as functions (U)

export default store