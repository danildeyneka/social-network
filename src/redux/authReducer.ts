import {authAPI, ResultCodeCaptchaEnum, ResultCodesEnum, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";

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

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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
const _setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null): SetUserDataType => ({
    type: SET_DATA,
    payload: {id, email, login, isAuth, captchaUrl}
})
type SetLoginErrorType = {
    type: typeof SET_DATA
    payload: { error: Array<string> | null}
}
const setLoginErrorAC = (error: Array<string> | null): SetLoginErrorType => ({type: SET_DATA, payload: {error}})
type SetCaptchaUrlType = {
    type: typeof SET_DATA
    payload: { captchaUrl: string }
}
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({type: SET_DATA, payload: {captchaUrl}})

type ActionTypes = InitType | SetUserDataType | SetLoginErrorType | SetCaptchaUrlType
type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>
export const getAuthUserData = (): ThunkType => async dispatch => {
    const data = await authAPI.getSelf()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = data.data
        dispatch(_setAuthUserDataAC(id, email, login, true, null))
    }
}
export const initApp = (): ThunkType => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(init())
}
export const logIn = (email: string, password: string, remember: boolean, captcha: string): ThunkType => async dispatch => { // убрать деструктуризацию (апи)
    const data = await authAPI.logIn(email, password, remember, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
        dispatch(setLoginErrorAC(null))
    } else if (data.resultCode === ResultCodeCaptchaEnum.CaptchaRequired) {
        dispatch(getCaptchaUrl())
        dispatch(setLoginErrorAC(data.messages))
    }
}
export const logOut = (): ThunkType => async dispatch => {
    const data = await authAPI.logOut()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(_setAuthUserDataAC(null, null, null, false, null))
    }
}
export const getCaptchaUrl = (): ThunkType => async dispatch => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer