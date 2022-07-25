import {RootState} from "./store";

export const selectMessagesData = (state: RootState) => state.messengerPage.messagesData
export const selectDialogsData = (state: RootState) => state.messengerPage.dialogsData
export const selectNewMessage = (state: RootState) => state.messengerPage.newMessage