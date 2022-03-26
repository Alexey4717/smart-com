import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataLoadingStates } from 'types/utility';
import type { DialogsById, MessagesById } from 'types/dialogs';
import {
  mapDialogsToStoreEntities,
  mapMessagesToStoreEntities
} from 'utils/dialogsUtils';
import { dialogsAPI, AllDialogsResponse } from '../api/dialogs';

export interface DialogsState {
  status: DataLoadingStates;
  errors: string | string[];
  dialogs: {
    ids: string[];
    byId: DialogsById;
  }
  messages: {
    ids: string[];
    byId: MessagesById;
  },
  totalMessagesCount: number;
  newMessagesCount: number;
};

const sliceName = 'dialogs';

const initialState: DialogsState = {
  status: DataLoadingStates.IDLE,
  errors: null,
  dialogs: {
    ids: [],
    byId: {}
  },
  messages: {
    ids: [],
    byId: {}
  },
  totalMessagesCount: 0,
  newMessagesCount: 0
};

export const getAllDialogs = createAsyncThunk<AllDialogsResponse>(
  `${sliceName}/getAllDialogs`,
  async () => await dialogsAPI.getAllDialogs());

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setDialog(state: DialogsState, action) {
      const [id, dialog] = action.payload;
      const dialogId = id.toString();
      state.dialogs.byId[dialogId] = dialog;
      state.dialogs.ids.push(dialogId);
    },
    setMessages(state: DialogsState, action) {
      const {
        messages,
        messagesIds
      } = mapMessagesToStoreEntities(action.payload);
      state.messages.byId = messages;
      state.messages.ids = messagesIds;
    },
    setTotalCount(state: DialogsState, action) {
      state.totalMessagesCount = action.payload;
    },
    setMessage(state: DialogsState, action) {
      const {
        id,
        body,
        translatedBody,
        addedAt,
        senderId,
        senderName,
        recipientId,
        viewed
      } = action.payload;
      const messageId = id.toString();
      state.messages.byId[messageId] = {
        body,
        translatedBody,
        addedAt,
        senderId,
        senderName,
        recipientId,
        viewed
      };
      state.messages.ids.push(messageId);
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
        const {
          dialogs,
          dialogsIds
        } = mapDialogsToStoreEntities(action.payload);
        state.dialogs.byId = dialogs;
        state.dialogs.ids = dialogsIds;
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
  setTotalCount,
  setNewMessagesCount
} = slice.actions;

export const { reducer: dialogsReducer } = slice;

export default slice;