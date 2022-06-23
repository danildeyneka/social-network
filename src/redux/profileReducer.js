import {profileAPI} from "../api/api";

const WRITE_POST = 'UPDATE_NEW_POST'
const ADD_POST = 'WRITE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

const initialState = {
    postData: [
        {id: 1, message: 'Hi there', likesCount: 4},
        {id: 2, message: 'Hi e3dq', likesCount: 6},
        {id: 3, message: 'Hi 23213', likesCount: 11},
        {id: 4, message: 'Hi', likesCount: 2},
    ],
    newPost: 'Введите текст',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case WRITE_POST:
            return {
                ...state,
                newPost: action.newPost
            }

        case ADD_POST:
            let newPost = {
                id: 5, // хардкод
                message: state.newPost, // ловим сообщение из textarea, записанное в стейт
                likesCount: 0
            }
            return {
                ...state, // копия стейта. варианты глубокой - JSON.parse(JSON.stringify(state)) и Object.assign({}, state)
                newPost: '', // очистка поля ввода после добавления поста
                postData: [...state.postData, newPost]
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default:
            return state
    }
}

export const writePost = (text) => ({type: WRITE_POST, newPost: text})
export const addPost = () => ({type: ADD_POST})
const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile})

export const setUserProfile = (match) => {
    return (dispatch) => {
        profileAPI.getProfile(match)
            .then(data => {
                dispatch(setUserProfileAC(data))
            })
    }
}
export default profileReducer