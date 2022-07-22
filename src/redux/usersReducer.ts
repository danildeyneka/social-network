import {usersAPI} from "../api/api";
import {mapUsersWithNewProperty} from "../utils/reducerHelpers/reducerHelpers";
import {UsersDataType} from "../types/types";

const SET_USERS = 'users/SET_USERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_FETCHING = 'users/TOGGLE_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_FOLLOWING_IN_PROGRESS'

const initialState = {
    usersData: [] as Array<UsersDataType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersData: [...action.usersData]
            }
        case FOLLOW:
            return {
                ...state,
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
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId] // добавляем юзера в массив обработки
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

type ActionTypes = FollowType | UnfollowType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType |
    ToggleFetchingType | ToggleFollowingInProgressType

type FollowType = {
    type: typeof FOLLOW
    userId: number
}
const followAC = (userId: number): FollowType => ({type: FOLLOW, userId})
type UnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
const unfollowAC = (userId: number): UnfollowType => ({type: UNFOLLOW, userId})
type SetUsersType = {
    type: typeof SET_USERS
    usersData: Array<UsersDataType>
}
const setUsers = (usersData: Array<UsersDataType>): SetUsersType => ({type: SET_USERS, usersData})
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}
const toggleFetching = (isFetching: boolean): ToggleFetchingType => ({type: TOGGLE_FETCHING, isFetching})
type ToggleFollowingInProgressType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    followingInProgress: boolean
    userId: number
}
const toggleFollowingInProgress = (followingInProgress: boolean, userId: number): ToggleFollowingInProgressType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userId
})

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleFetching(true))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}
// export const onPageChanged = (pageNumber: number, pageSize: number) => async (dispatch: any) => {
//     dispatch(setCurrentPage(pageNumber))
//     dispatch(toggleFetching(true))
//     const data = await usersAPI.getUsers(pageNumber, pageSize)
//     dispatch(toggleFetching(false))
//     dispatch(setUsers(data.items))
// }

const toggleFollowing = async (dispatch: any, userId: number, apiRequest: any, action: any) => {
    dispatch(toggleFollowingInProgress(true, userId))
    const data = await apiRequest(userId)
    if (data.resultCode === 0) {
        dispatch(action(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}
export const unfollow = (userId: number) => async (dispatch: any) => {
    const apiRequest = usersAPI.unfollow.bind(usersAPI)
    await toggleFollowing(dispatch, userId, apiRequest, unfollowAC)
}
export const follow = (userId: number) => async (dispatch: any) => {
    const apiRequest = usersAPI.follow.bind(usersAPI)
    await toggleFollowing(dispatch, userId, apiRequest, followAC)
}

export default usersReducer