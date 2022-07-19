import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profileReducer";
import messengerReducer from "./messengerReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    usersPage: usersReducer,
    auth: authReducer
})

let store = legacy_createStore(reducers, applyMiddleware(thunk))

export default store