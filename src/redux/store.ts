import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profileReducer";
import messengerReducer from "./messengerReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    usersPage: usersReducer,
    auth: authReducer
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = legacy_createStore(rootReducer, applyMiddleware(thunk)) // or configureStore (rtk)

export default store