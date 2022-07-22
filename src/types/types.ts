export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
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
    [key: string]: string // for mapping
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