import {combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profileReducer";
import messengerReducer from "./messengerReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    usersPage: usersReducer
})

let store = legacy_createStore(reducers)

export default store