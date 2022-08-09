import {WSMessagesType} from '../types/types'
import {InferActionTypes, RootState} from './store'
import {ThunkAction} from 'redux-thunk'
import {messengerAPI} from '../api/messengerAPI'
import {Dispatch} from '@reduxjs/toolkit'

const initialState = {
    messages: [] as WSMessagesType[]
}

export type InitialStateType = typeof initialState

const messengerReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'messenger/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        case 'messenger/CLEAR_MESSAGES':
            return {
                ...state,
                messages: []
            }
        default:
            return state
    }
}

type ActionTypes = InferActionTypes<typeof actions>
export const actions = {
    messageReceived: (messages: WSMessagesType[]) => ({
        type: 'messenger/MESSAGES_RECEIVED', payload: messages
    } as const),
    messageCleared: () => ({
        type: 'messenger/CLEAR_MESSAGES'
    } as const)
}

let _newMessageHandler: ((messages: WSMessagesType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (!_newMessageHandler) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messageReceived(messages))
        }
    }
    return _newMessageHandler
}

export const sendMessage = (message: string): ThunkType => async dispatch => {
    messengerAPI.sendMessage(message)
}

type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>
export const startMessagesListening = (): ThunkType => async dispatch => {
    messengerAPI.start()
    messengerAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async dispatch => {
    messengerAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    messengerAPI.stop()
    dispatch(actions.messageCleared())
}

export default messengerReducer