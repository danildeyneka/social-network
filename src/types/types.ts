export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: PhotosType
    aboutMe: string
}
export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type UsersDataType = {
    followed: boolean;
    id: number
    name: string
    status: string
    photos: PhotosType
}
export type UseMatchType = {
    params: {
        userId: string
    }
} | null
export type FormValuesType = {
    email: string
    password: string
    remember: boolean
    captcha: string
    newMessage: string
    newPost: string
}
export type WSMessagesType = {
    message: string
    photo: string
    userId: number
    userName: string
}