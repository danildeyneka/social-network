import {RootState} from "./store";

export const selectUserProfile = (state: RootState) => state.profilePage.profile!
export const selectStatus = (state: RootState) => state.profilePage.status