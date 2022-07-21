import {AppStateType} from "./store";

export const selectIsFetching = (state: AppStateType) => state.usersPage.isFetching
export const selectPageSize = (state: AppStateType) => state.usersPage.pageSize
export const selectUsersData = (state: AppStateType) => state.usersPage.usersData
export const selectFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress
export const selectCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const selectTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount