import {profileAPI} from "../api/api";

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
    ],
    newPost: 'Введите текст',
    profile: null,
    status: 'edit status'
}

const profileReducer = (state = initialState, action) => {
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
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
}

export const addPost = (newPost) => ({type: ADD_POST, newPost})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const setStatusAC = (status) => ({type: SET_STATUS, status})
const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile})
const uploadAvatarAC = (photos) => ({type: UPLOAD_AVATAR, photos})

export const getStatus = (id) => async dispatch => {
    const data = await profileAPI.getStatus(id)
    dispatch(setStatusAC(data))
}
export const updateStatus = (status) => async dispatch => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatusAC(status))
    } else if (data.resultCode === 1) {
        alert('Max status length is 300 symbols')
        dispatch(setStatusAC(initialState.status))
    }
}
export const setUserProfile = (match, myId) => async dispatch => {
    const data = await profileAPI.getProfile(match, myId)
    dispatch(setUserProfileAC(data))
}
export const uploadAvatar = (file) => async dispatch => {
    const data = await profileAPI.uploadAvatar(file)
    if (data.resultCode === 0) {
        dispatch(uploadAvatarAC(data.data.photos))
    }
}
export const saveProfile = (profileSettings, myId) => async dispatch => {
    const data = await profileAPI.saveProfile(profileSettings)
    if (data.resultCode === 0) {
        dispatch(setUserProfile(undefined, myId))
    } else alert(data.messages)
}

export default profileReducer