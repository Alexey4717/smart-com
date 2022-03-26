import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthUser } from 'types/user';
import { DataLoadingStates } from 'types/utility';
import { authAPI, MeResponseDataType } from '../api/auth';
import { securityAPI, GetCaptchaUrlResponseType } from '../api/security';
export interface AuthState {
  status: DataLoadingStates;
  errors: string | string[];
  isAuthenticated: boolean;
  isFetching: boolean;
  captchaUrl?: any;
  user: AuthUser | null;
};

const sliceName = 'auth';

const initialState: AuthState = {
  status: DataLoadingStates.IDLE,
  errors: null,
  isAuthenticated: false,
  isFetching: false,
  captchaUrl: null,
  user: {
    id: null,
    login: null,
    email: null
  },
};

export const getAuthUserData = createAsyncThunk<MeResponseDataType>(
  `${sliceName}/getAuthUserData`,
  async () => {
    const { data } = await authAPI.me();
    return data
  });

export const getCapthaUrl = createAsyncThunk<GetCaptchaUrlResponseType>(
  `${sliceName}/getCapthaUrl`,
  async () => await securityAPI.getCaptchaUrl());

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.isAuthenticated = false;
      state.user.id = null;
      state.user.login = null;
      state.user.email = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAuthUserData.pending, (state) => {
        state.status = DataLoadingStates.LOADING;
      })
      .addCase(getAuthUserData.fulfilled, (state, action) => {

        const { id, login, email } = action.payload;
        state.user.id = id;
        state.user.login = login;
        state.user.email = email;
        state.isAuthenticated = Boolean(id);
        state.status = DataLoadingStates.IDLE;
      })
      .addCase(getAuthUserData.rejected, (state, { error }) => {
        state.errors = error.message;
        state.status = DataLoadingStates.ERROR;
      })
      .addCase(getCapthaUrl.pending, (state) => {
        state.status = DataLoadingStates.LOADING;
      })
      .addCase(getCapthaUrl.fulfilled, (state, action) => {
        state.captchaUrl = action.payload;
        state.status = DataLoadingStates.IDLE;
      })
      .addCase(getCapthaUrl.rejected, (state, { error }) => {
        state.errors = error.message;
        state.status = DataLoadingStates.ERROR;
      })
  }
});

export const {
  logout
} = slice.actions;

export const { reducer: authReducer } = slice;

export default slice;