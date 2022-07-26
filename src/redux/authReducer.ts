import {ResultCodeCaptchaEnum, ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {authAPI} from "../api/authAPI";

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

const actions = {
    init: () => ({type: INIT} as const),
    _setAuthUserDataAC: (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null) => ({
        type: SET_DATA,
        payload: {id, email, login, isAuth, captchaUrl}
    } as const),
    setLoginErrorAC: (error: Array<string> | null) => ({type: SET_DATA, payload: {error}} as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: SET_DATA, payload: {captchaUrl}} as const)
}

type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>

export const getAuthUserData = (): ThunkType => async dispatch => {
    const data = await authAPI.getSelf()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = data.data
        dispatch(actions._setAuthUserDataAC(id, email, login, true, null))
    }
}
export const initApp = (): ThunkType => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(actions.init())
}
export const logIn = (email: string, password: string, remember: boolean, captcha: string | null): ThunkType => async dispatch => { // убрать деструктуризацию (апи)
    const data = await authAPI.logIn(email, password, remember, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
        dispatch(actions.setLoginErrorAC(null))
    } else if (data.resultCode === ResultCodeCaptchaEnum.CaptchaRequired) {
        dispatch(getCaptchaUrl())
        dispatch(actions.setLoginErrorAC(data.messages))
    }
}
export const logOut = (): ThunkType => async dispatch => {
    const data = await authAPI.logOut()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions._setAuthUserDataAC(null, null, null, false, null))
    }
}
export const getCaptchaUrl = (): ThunkType => async dispatch => {
    const data = await authAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.setCaptchaUrl(captchaUrl))
}

export default authReducer