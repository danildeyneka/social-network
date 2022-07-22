import {AppStateType} from "./store";

export const selectUserProfile = (state: AppStateType) => state.profilePage.profile!
export const selectStatus = (state: AppStateType) => state.profilePage.status