import {profileAPI} from "../api/api";

const ADD_POST = 'profile/ADD_POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'

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

        default:
            return state
    }
}

export const addPost = (newPost) => ({type: ADD_POST, newPost})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatusAC = (status) => ({type: SET_STATUS, status: status})

export const getStatus = (id) => async dispatch => {
    const response = await profileAPI.getStatus(id)
    dispatch(setStatusAC(response.data))
}

export const updateStatus = (status) => async dispatch => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    } else if (response.data.resultCode === 1) {
        alert('Max status length is 300 symbols')
        dispatch(setStatusAC(initialState.status))
    }
}

export const setUserProfile = (match, myId) => async dispatch => {
    const data = await profileAPI.getProfile(match, myId)
    dispatch(setUserProfileAC(data))
}

export default profileReducer