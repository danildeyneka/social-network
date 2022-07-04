import {usersAPI} from "../api/api";
import {mapUsersWithNewProperty} from "../utils/reducerHelpers/reducerHelpers";

const SET_USERS = 'users/SET_USERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS'

const initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersData: [...action.usersData]
            }

        case FOLLOW:
            return {
                ...state,
                // usersData: state.usersData.map(user => {
                //     if (user.id === action.userId) {
                //         return {...user, followed: true}
                //     }
                //     return user
                // })
                usersData: mapUsersWithNewProperty(state.usersData, action.userId, 'id', {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                usersData: mapUsersWithNewProperty(state.usersData, action.userId, 'id', {followed: false})
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                    ? [...state.isFollowingInProgress, action.userId] // добавляем юзера в массив обработки
                    : state.isFollowingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state
    }
}

const followAC = (userId) => ({type: FOLLOW, userId})
const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
const setUsers = (usersData) => ({type: SET_USERS, usersData})
const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
const toggleIsFollowingInProgress = (isFollowingInProgress, userId) => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFollowingInProgress,
    userId
})

export const getUsers = (currentPage, pageSize) => async dispatch => {
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}
export const onPageChanged = (pageNumber, pageSize) => async dispatch => {
    dispatch(setCurrentPage(pageNumber))
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
}

const toggleFollowing = async (dispatch, userId, apiRequest, action) => {
    dispatch(toggleIsFollowingInProgress(true, userId))
    const data = await apiRequest(userId)
    if (data.resultCode === 0) {
        dispatch(action(userId))
    }
    dispatch(toggleIsFollowingInProgress(false, userId))
}
export const unfollow = (userId) => async dispatch => {
    const apiRequest = usersAPI.unfollow.bind(usersAPI)
    await toggleFollowing(dispatch, userId, apiRequest, unfollowAC)
}
export const follow = (userId) => async dispatch => {
    const apiRequest = usersAPI.follow.bind(usersAPI)
    await toggleFollowing(dispatch, userId, apiRequest, followAC)
}

export default usersReducer
