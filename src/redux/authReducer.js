import {authAPI, securityAPI} from "../api/api";

const INIT = 'auth/INIT'
const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_LOGIN_ERROR = 'auth/SET_LOGIN_ERROR'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'

const initialState = {
    id: null,
    email: null,
    login: null,
    error: null,
    isAuth: false,
    init: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                init: true
            }

        case SET_USER_DATA:
        case SET_LOGIN_ERROR:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

const init = () => ({type: INIT})
const setAuthUserDataAC = (id, email, login, isAuth, captchaUrl) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth, captchaUrl}})
const setLoginErrorAC = (error) => ({type: SET_LOGIN_ERROR, payload: {error}})
const setCaptchaUrl = (captchaUrl) => ({type: SET_LOGIN_ERROR, payload: {captchaUrl}})

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

export const logIn = ({email, password, remember, captcha}) => async dispatch => {
    const response = await authAPI.logIn(email, password, remember, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
        dispatch(setLoginErrorAC(null))
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

        dispatch(setLoginErrorAC(response.data.messages))
    }
}

export const logOut = () => async dispatch => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false, null))
    }
}

export const getCaptchaUrl = () => async dispatch => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer