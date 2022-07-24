import axios from "axios";
import {ProfileType, UseMatchType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1120c8b-ed03-4355-9a4d-e33a0f97ab87'
    }
})

export const usersAPI = {
    getUsers: (page = 1, pageSize = 10) => {
        return instance.get(`users?page=${page}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow: (id: number) => {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow: (id: number) => {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile: (match: UseMatchType, myId: number) => {
        return instance.get(`profile/${match ? match.params.userId : myId}`)
            .then(response => response.data)
    },
    getStatus: (id: number) => {
        return instance.get('profile/status/' + id)
            .then(response => response.data)
    },
    updateStatus: (status: string) => {
        return instance.put('profile/status', {status: status.trim()})
            .then(response => response.data)
    },
    uploadAvatar: (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put('profile/photo', formData)
            .then(response => response.data)
    },
    saveProfile: (profile: ProfileType) => {
        return instance.put('profile', profile)
            .then(response => response.data)
    }
}

export const authAPI = {
    getSelf: () => {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    logIn: (email: string, password: string, remember: boolean, captcha: string) => { // добавть деструктуризацию??
        return instance.post('auth/login', {email, password, remember, captcha})
    },
    logOut: () => {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl: () => {
        return instance.get('security/get-captcha-url')
    }
}