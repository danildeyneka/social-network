import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state
    }
}

const setAuthUserDataAC = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login}})

export const setAuthUserData = () => {
    return dispatch => {
        authAPI.getSelf()
            .then((data) => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(setAuthUserDataAC(id, email, login))
                }
            })
    }
}

export default authReducer