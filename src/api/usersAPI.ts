import {UsersDataType} from "../types/types";
import {instance} from "./api";
import {ResponseType} from "./api";

export type GetUsersType = {
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