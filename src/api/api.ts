import axios from "axios";
import {ProfileType, UseMatchType, UsersDataType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1120c8b-ed03-4355-9a4d-e33a0f97ab87'
    }
})

type ResponseType = {
    resultCode: number
    messages: Array<string>
    data: object
}

type GetUsersType = {
    items: Array<UsersDataType>
    totalCount: number
}
export const usersAPI = {
    getUsers: (page = 1, pageSize = 10) => {
        return instance.get<GetUsersType>(`users?page=${page}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow: (id: number) => {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow: (id: number) => {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    }
}

type UploadAvatarType = {
    resultCode: number
    messages: Array<string>
    data: {
        photos: {
            small: string
            large: string
        }
    }
}
export const profileAPI = {
    getProfile: (match: UseMatchType, myId: number | null) => {
        return instance.get<ProfileType>(`profile/${match ? match.params.userId : myId}`)
            .then(response => response.data)
    },
    getStatus: (id: number) => {
        return instance.get<any>('profile/status/' + id)
            .then(response => response.data)
    },
    updateStatus: (status: string) => {
        return instance.put<ResponseType>('profile/status', {status: status.trim()})
            .then(response => response.data)
    },
    uploadAvatar: (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<UploadAvatarType>('profile/photo', formData)
            .then(response => response.data)
    },
    saveProfile: (profile: ProfileType) => {
        return instance.put<ResponseType>('profile', profile)
            .then(response => response.data)
    }
}

type GetSelfType = {
    resultCode: number
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}
export const authAPI = {
    getSelf: () => {
        return instance.get<GetSelfType>(`auth/me`)
            .then(response => response.data)
    },
    logIn: (email: string, password: string, remember: boolean, captcha: string | null) => { // добавть деструктуризацию??
        return instance.post<ResponseType>('auth/login', {email, password, remember, captcha})
            .then(response => response.data)
    },
    logOut: () => {
        return instance.delete<ResponseType>('auth/login')
            .then(response => response.data)
    }
}

type GetCaptchaUrlType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl: () => {
        return instance.get<GetCaptchaUrlType>('security/get-captcha-url')
            .then(response => response.data)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum {
    CaptchaRequired = 10
}