import {authAPI} from "../api/api";

const INIT = 'auth/INIT'
const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_LOGIN_ERROR = 'auth/SET_LOGIN_ERROR'

const initialState = {
    id: null,
    email: null,
    login: null,
    error: null,
    isAuth: false,
    init: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                init: true
            }

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        case SET_LOGIN_ERROR:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}

const init = () => ({type: INIT})
const setAuthUserDataAC = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
const setLoginErrorAC = (error) => ({type: SET_LOGIN_ERROR, error})

export const getAuthUserData = () => async dispatch => {
    const data = await authAPI.getSelf()
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

export const initApp = () => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(init())
}

export const logIn = ({email, password, remember}) => async dispatch => {
    const response = await authAPI.logIn(email, password, remember)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
        dispatch(setLoginErrorAC(null))
    } else {
        dispatch(setLoginErrorAC(response.data.messages))
    }
}

export const logOut = () => async dispatch => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}


export default authReducer