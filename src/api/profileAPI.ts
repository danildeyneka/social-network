import {ProfileType, UseMatchType} from "../types/types";
import {instance} from "./api";
import {ResponseType} from "./api";

type UploadAvatarType = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: number
    messages: Array<string>
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