import {RootState} from "../store";

export const selectIsFetching = (state: RootState) => state.usersPage.isFetching
export const selectPageSize = (state: RootState) => state.usersPage.pageSize
export const selectUsersData = (state: RootState) => state.usersPage.usersData
export const selectFollowingInProgress = (state: RootState) => state.usersPage.followingInProgress
export const selectCurrentPage = (state: RootState) => state.usersPage.currentPage
export const selectTotalUsersCount = (state: RootState) => state.usersPage.totalUsersCount
export const selectFilter = (state: RootState) => state.usersPage.filter