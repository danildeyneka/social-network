import {AppStateType} from "./store";

export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize
export const getUsersData = (state: AppStateType) => state.usersPage.usersData
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount