import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
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

const setAuthUserDataAC = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
const setLoginErrorAC = (error) => ({type: SET_LOGIN_ERROR, error})

export const getAuthUserData = () => dispatch => {
    authAPI.getSelf()
        .then((data) => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserDataAC(id, email, login, true))
            }
        })
}

export const logIn = ({email, password, remember}) => dispatch => {
    authAPI.logIn(email, password, remember)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
                dispatch(setLoginErrorAC(null))
            } else {
                dispatch(setLoginErrorAC(...response.data.messages)) //
            }
        })
}

export const logOut = () => dispatch => {
    authAPI.logOut()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        })
}

export default authReducer