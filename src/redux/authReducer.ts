import {authAPI, securityAPI} from "../api/api";

const INIT = 'auth/INIT'
const SET_DATA = 'auth/SET_DATA'

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    authError // ??
    isAuth: boolean
    init: boolean
    captchaUrl: string | null
}

const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    authError: null,
    isAuth: false,
    init: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                init: true
            }

        case SET_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

type InitType = {
    type: typeof INIT
}
const init = (): InitType => ({type: INIT})

type SetUserDataPayloadType = {
    id: number
    email: string
    login: string
    isAuth: boolean
    captchaUrl: string
}
type SetUserDataType = {
    type: typeof SET_DATA
    payload: SetUserDataPayloadType
}
const setAuthUserDataAC = (id: number, email: string, login: string, isAuth: boolean, captchaUrl: string): SetUserDataType => ({
    type: SET_DATA,
    payload: {id, email, login, isAuth, captchaUrl}
})

type SetLoginErrorType = {
    type: typeof SET_DATA
    payload: { error: boolean }
}
const setLoginErrorAC = (error: boolean): SetLoginErrorType => ({type: SET_DATA, payload: {error}})

type SetCaptchaUrlType = {
    type: typeof SET_DATA
    payload: { captchaUrl: string }
}
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({type: SET_DATA, payload: {captchaUrl}})

export const getAuthUserData = () => async dispatch => {
    const data = await authAPI.getSelf()
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setAuthUserDataAC(id, email, login, true, null))
    }
}

export const initApp = () => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(init())
}

export const logIn = ({email, password, remember, captcha}) => async dispatch => { // убрать деструктуризацию (апи)
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