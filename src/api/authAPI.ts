import {instance, ResultCodeCaptchaEnum, ResultCodesEnum} from "./api";
import {ResponseType} from "./api";

type GetSelfDataType = {
    id: number
    email: string
    login: string
}
type GetCaptchaUrlType = {
    url: string
}

export const authAPI = {
    getSelf: () => {
        return instance.get<ResponseType<GetSelfDataType>>(`auth/me`)
            .then(response => response.data)
    },
    logIn: (email: string, password: string, remember: boolean, captcha: string | null) => { // добавть деструктуризацию??
        return instance.post<ResponseType<{}, ResultCodesEnum | ResultCodeCaptchaEnum>>('auth/login', {email, password, remember, captcha})
            .then(response => response.data)
    },
    logOut: () => {
        return instance.delete<ResponseType>('auth/login')
            .then(response => response.data)
    },
    getCaptchaUrl: () => {
        return instance.get<GetCaptchaUrlType>('security/get-captcha-url')
            .then(response => response.data)
    }
}