import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1120c8b-ed03-4355-9a4d-e33a0f97ab87'
    }
})

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum {
    CaptchaRequired = 10
}