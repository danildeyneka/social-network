import {WSMessagesType} from "../types/types";
import {InferActionTypes, RootState} from "./store";
import {ThunkAction} from "redux-thunk";
import {messengerAPI} from "../api/messengerAPI";

const initialState = {
    messages: [] as WSMessagesType[]
}

export type InitialStateType = typeof initialState

const messengerReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "messenger/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        default: return state
    }
}

type ActionTypes = InferActionTypes<typeof actions>
export const actions = {
    messageReceived: (messages: WSMessagesType[]) => ({
        type: 'messenger/MESSAGES_RECEIVED', payload: messages
    } as const)
}

type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>
export const startMessagesListening = (): ThunkType => async dispatch => {
    messengerAPI.subscribe((messages) => {
        dispatch(actions.messageReceived(messages))
    })
}
export const stopMessagesListening = (): ThunkType => async dispatch => {
    messengerAPI.subscribe((messages) => {
        dispatch(actions.messageReceived(messages))
    })
}


export default messengerReducer