import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataLoadingStates } from 'types/utility';
import type { Dialog, Messages } from 'types/dialogs';
import { dialogsAPI } from '../api/dialogs';
import type { AppThunk } from '../';

export interface DialogsState {
  status: DataLoadingStates;
  errors: string | string[];
  dialogs: Dialog[]; //исправить
  messages: Messages[]; //исправить
  spamMessages: any[]; //исправить
  deletedMessages: any[]; //исправить
  newMessagesCount: number;
};

const sliceName = 'dialogs';

const initialState: DialogsState = {
  status: DataLoadingStates.IDLE,
  errors: null,
  dialogs: [],
  messages: [],
  spamMessages: [],
  deletedMessages: [],
  newMessagesCount: 0
};

interface AllDialogsResponse {
  data: any[]; //исправить
  resultCode?: number | string;
};

export const getAllDialogs = createAsyncThunk<AllDialogsResponse>(
  `${sliceName}/getAllDialogs`,
  async (): Promise<AllDialogsResponse> => {
    const response = await dialogsAPI.getAllDialogs();
    return response;
  });

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setDialog(state: DialogsState, action) {
      state.dialogs.push(action.payload);
    },
    setMessages(state: DialogsState, action) {
      state.messages = action.payload;
    },
    setMessage(state: DialogsState, action) {
      const { message } = action.payload;
      state.messages.push(message);
    },
    setIsMessageViewed(state: DialogsState, action) {

    },
    setSpamMessages(state: DialogsState, action) {
      state.spamMessages = action.payload;
    },
    setDeletedMessages(state: DialogsState, action) {
      state.deletedMessages = action.payload;
    },
    setNewMessagesCount(state: DialogsState, action) {
      state.newMessagesCount = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllDialogs.pending, (state) => {
        state.status = DataLoadingStates.LOADING;
      })
      .addCase(getAllDialogs.fulfilled, (state, action) => {
        state.dialogs = action.payload.data; //посмотреть ответ
        state.status = DataLoadingStates.IDLE;
      })
      .addCase(getAllDialogs.rejected, (state, { error }) => {
        state.errors = error.message;
        state.status = DataLoadingStates.ERROR;
      })
  }
});

export const {
  setDialog,
  setMessages,
  setMessage,
  setIsMessageViewed,
  setSpamMessages,
  setDeletedMessages,
  setNewMessagesCount
} = slice.actions;

export const getMessages = (userId): AppThunk => async (dispatch) => {
  const response = await dialogsAPI.getMessages(userId);
  dispatch(setMessages(response));
};

export const { reducer: dialogsReducer } = slice;

export default slice;