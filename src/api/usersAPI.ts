import {UsersDataType} from "../types/types";
import {instance} from "./api";
import {ResponseType} from "./api";
import {UserFriendType} from "../redux/usersReducer";

export type GetUsersType = {
    items: Array<UsersDataType>
    totalCount: number
}

export const usersAPI = {
    getUsers: (page = 1, pageSize = 10, term: string, friend: string | UserFriendType) => {
        return instance.get<GetUsersType>(`users?page=${page}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
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