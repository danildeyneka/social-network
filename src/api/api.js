import axios from "axios";

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
    follow: (id) => {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow: (id) => {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile: (match, myId) => {
        return instance.get(`profile/${match ? match.params.userId : myId}`)
            .then(response => response.data)
    },
    getStatus: (id) => {
        return instance.get('profile/status/' + id)
            .then(response => response.data)
    },
    updateStatus: (status) => {
        return instance.put('profile/status', {status: status.trim()})
            .then(response => response.data)
    },
    uploadAvatar: (file) => {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put('profile/photo', formData)
            .then(response => response.data)
    },
    saveProfile: (profileSettings) => {
        return instance.put('profile', profileSettings)
            .then(response => response.data)
    }
}

export const authAPI = {
    getSelf: () => {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    logIn: (email, password, remember, captcha) => { // добавть деструктуризацию??
        return instance.post('auth/login', {
            email, password, remember, captcha
        })
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