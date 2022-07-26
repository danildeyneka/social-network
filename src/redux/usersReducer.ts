import {mapUsersWithNewProperty} from "../utils/reducerHelpers/reducerHelpers";
import {UsersDataType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./store";
import {Dispatch} from "react";
import {usersAPI} from "../api/usersAPI";

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
        case 'SET_USERS':
            return {
                ...state,
                usersData: [...action.usersData]
            }
        case 'FOLLOW':
            return {
                ...state,
                usersData: mapUsersWithNewProperty(state.usersData, action.userId, 'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                usersData: mapUsersWithNewProperty(state.usersData, action.userId, 'id', {followed: false})
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'TOGGLE_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'TOGGLE_FOLLOWING_IN_PROGRESS':
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

type ActionTypes = InferActionTypes<typeof actions>
export const actions = {
    followAC: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowAC: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (usersData: Array<UsersDataType>) => ({type: 'SET_USERS', usersData} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleFetching: (isFetching: boolean) => ({type: 'TOGGLE_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'TOGGLE_FOLLOWING_IN_PROGRESS',
        followingInProgress,
        userId
    } as const)
}

type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>
type DispatchType = Dispatch<ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.toggleFetching(true))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.toggleFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}
const _toggleFollowing = async (dispatch: DispatchType, userId: number, apiRequest: any, action: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    const data = await apiRequest(userId)
    if (data.resultCode === 0) {
        dispatch(action(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}
export const unfollow = (userId: number): ThunkType => async dispatch => {
    const apiRequest = usersAPI.unfollow.bind(usersAPI)
    await _toggleFollowing(dispatch, userId, apiRequest, actions.unfollowAC)
}
export const follow = (userId: number): ThunkType => async dispatch => {
    const apiRequest = usersAPI.follow.bind(usersAPI)
    await _toggleFollowing(dispatch, userId, apiRequest, actions.followAC)
}

export default usersReducer