import {RootState} from "./store";

export const selectMyId = (state: RootState) => state.auth.id
export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectAuthError = (state: RootState) => state.auth.authError
export const selectCaptchaUrl = (state: RootState) => state.auth.captchaUrl