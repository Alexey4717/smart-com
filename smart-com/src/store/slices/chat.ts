import { createSlice } from '@reduxjs/toolkit';
import type { AppThunk } from '../';
import type { Message } from 'types/chat';
import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { StatusLoadingWs } from 'types/utility';
import { chatAPI, ChatMessageAPIType } from '../api/chat';

export interface ChatState {
  status: StatusLoadingWs;
  errors: string | string[];
  messages: Message[]
};

const sliceName = 'chat';

const initialState: ChatState = {
  status: StatusLoadingWs.PENDING,
  errors: null,
  messages: []
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setMessages(state: ChatState, action) {
      state.messages = [
        ...state.messages,
        ...action.payload.map(message => ({ ...message, id: v1() }))
      ]
        .filter((m, index, array) => index >= array.length - 100)
    },
    changeStatus(state: ChatState, action) {
      state.status = action.payload;
    },
    setErrors(state:ChatState, action) {
      state.errors = action.payload;
    },
    resetMessages(state: ChatState) {
      const {
        messages
      } = initialState;

      state.messages = messages;
    },
  }
});

export const {
  setMessages,
  changeStatus,
  setErrors,
  resetMessages
} = slice.actions;

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(setMessages(messages))
    }
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusLoadingWs) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(changeStatus(status))
    }
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): AppThunk => async (dispatch) => {
  try {
    chatAPI.start();
    // @ts-ignore
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    // @ts-ignore
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
  } catch (error) {
    dispatch(changeStatus(StatusLoadingWs.ERROR));
    dispatch(setErrors(error));
  }
};

export const stopMessagesListening = (): AppThunk => async (dispatch) => {
  try {
    // @ts-ignore
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    // @ts-ignore
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
  } catch {
    dispatch(changeStatus(StatusLoadingWs.ERROR));
  }
};

export const sendMessage = (message: string): AppThunk => async (dispatch) => {
  try {
    chatAPI.sendMessage(message)
  } catch {
    dispatch(changeStatus(StatusLoadingWs.ERROR));
  }
};

export const { reducer: chatReducer } = slice;

export default slice;