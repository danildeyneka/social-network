import {profileAPI} from "../api/api";
import {PostDataType, ProfileType, PhotosType, UseMatchType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";

const ADD_POST = 'profile/ADD_POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const UPLOAD_AVATAR = 'profile/UPLOAD_AVATAR'

const initialState = {
    postData: [
        {id: 1, message: 'Hi there', likesCount: 4},
        {id: 2, message: 'Hi e3dq', likesCount: 6},
        {id: 3, message: 'Hi 23213', likesCount: 11},
        {id: 4, message: 'Hi', likesCount: 2},
    ] as Array<PostDataType>,
    newPost: 'Введите текст',
    profile: null as ProfileType | null,
    status: 'edit status'
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, // хардкод
                message: action.newPost, // ловим сообщение из textarea, записанное в стейт
                likesCount: 0
            }
            return {
                ...state, // копия стейта. варианты глубокой - JSON.parse(JSON.stringify(state)) и Object.assign({}, state)
                postData: [...state.postData, newPost]
            }
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case UPLOAD_AVATAR:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

type ActionTypes = AddPostType | DeletePostType | SetStatusType | SetUserProfileType | UploadAvatarType
type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>

type AddPostType = {
    type: typeof ADD_POST
    newPost: string
}
export const addPost = (newPost: string): AddPostType => ({type: ADD_POST, newPost})
type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId})
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatusAC = (status: string): SetStatusType => ({type: SET_STATUS, status})
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
const setUserProfileAC = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
type UploadAvatarType = {
    type: typeof UPLOAD_AVATAR
    photos: PhotosType
}
const uploadAvatarAC = (photos:PhotosType): UploadAvatarType => ({type: UPLOAD_AVATAR, photos})

export const getStatus = (id: number): ThunkType => async dispatch => {
    const data = await profileAPI.getStatus(id)
    dispatch(setStatusAC(data))
}
export const updateStatus = (status: string): ThunkType => async dispatch => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatusAC(status))
    } else if (data.resultCode === 1) {
        alert('Max status length is 300 symbols')
        dispatch(setStatusAC(initialState.status))
    }
}
export const setUserProfile = (match: UseMatchType, myId: number | null): ThunkType => async dispatch => {
    const data = await profileAPI.getProfile(match, myId)
    dispatch(setUserProfileAC(data))
}
export const uploadAvatar = (file: File): ThunkType => async dispatch => {
    const data = await profileAPI.uploadAvatar(file)
    if (data.resultCode === 0) {
        dispatch(uploadAvatarAC(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType, myId: number | null): ThunkType => async dispatch => {
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(setUserProfile(null, myId))
    } else alert(data.messages)
}

export default profileReducer