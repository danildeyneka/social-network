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
        return instance.get( `users?page=${page}&count=${pageSize}`)
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