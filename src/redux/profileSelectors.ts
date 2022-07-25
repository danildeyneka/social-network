import {RootState} from "./store";

export const selectUserProfile = (state: RootState) => state.profilePage.profile!
export const selectStatus = (state: RootState) => state.profilePage.status
export const selectPostData = (state: RootState) => state.profilePage.postData
export const selectNewPost = (state: RootState) => state.profilePage.newPost