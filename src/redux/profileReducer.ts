import {PhotosType, ProfileType, UseMatchType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {profileAPI} from "../api/profileAPI";

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const UPLOAD_AVATAR = 'profile/UPLOAD_AVATAR'

const initialState = {
    profile: null as ProfileType | null,
    status: 'edit status'
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
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

type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>

export const actions = {
    setStatusAC: (status: string) => ({type: SET_STATUS, status} as const),
    setUserProfileAC: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    uploadAvatarAC: (photos: PhotosType) => ({type: UPLOAD_AVATAR, photos} as const)
}

export const getStatus = (id: number | null): ThunkType => async dispatch => {
    const data = await profileAPI.getStatus(id)
    dispatch(actions.setStatusAC(data))
}
export const updateStatus = (status: string): ThunkType => async dispatch => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatusAC(status))
    } else if (data.resultCode === 1) {
        alert('Max status length is 300 symbols')
        dispatch(actions.setStatusAC(initialState.status))
    }
}
export const setUserProfile = (match: UseMatchType, myId: number | null): ThunkType => async dispatch => {
    const data = await profileAPI.getProfile(match, myId)
    dispatch(actions.setUserProfileAC(data))
}
export const uploadAvatar = (file: File): ThunkType => async dispatch => {
    const data = await profileAPI.uploadAvatar(file)
    if (data.resultCode === 0) {
        dispatch(actions.uploadAvatarAC(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType, myId: number | null): ThunkType => async dispatch => {
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(setUserProfile(null, myId))
    } else alert(data.messages)
}

export default profileReducer