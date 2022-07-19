import {authAPI, securityAPI} from "../api/api";

const INIT = 'auth/INIT'
const SET_DATA = 'auth/SET_DATA'

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    authError: null as null | string,
    isAuth: false,
    init: false,
    captchaUrl: null as null | string
}

export type InitialStateType = typeof initialState

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
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
type SetUserDataType = {
    type: typeof SET_DATA
    payload: SetUserDataPayloadType
}
const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null): SetUserDataType => ({
    type: SET_DATA,
    payload: {id, email, login, isAuth, captchaUrl}
})

type SetLoginErrorType = {
    type: typeof SET_DATA
    payload: { error: boolean | null }
}
const setLoginErrorAC = (error: boolean | null): SetLoginErrorType => ({type: SET_DATA, payload: {error}})

type SetCaptchaUrlType = {
    type: typeof SET_DATA
    payload: { captchaUrl: string }
}
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({type: SET_DATA, payload: {captchaUrl}})

export const getAuthUserData = () => async (dispatch: any) => {
    const data = await authAPI.getSelf()
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setAuthUserDataAC(id, email, login, true, null))
    }
}

export const initApp = () => async (dispatch: any) => {
    await dispatch(getAuthUserData())
    dispatch(init())
}

export const logIn = (email: string, password: string, remember: boolean, captcha: string) => async (dispatch: any) => { // убрать деструктуризацию (апи)
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

export const logOut = () => async (dispatch: any) => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false, null))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer