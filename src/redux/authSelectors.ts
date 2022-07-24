import {RootState} from "./store";

export const selectMyId = (state: RootState) => state.auth.id
export const selectIsAuth = (state: RootState) => state.auth.isAuth