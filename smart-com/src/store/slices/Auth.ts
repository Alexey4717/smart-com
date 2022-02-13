import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'types/user';

type InitialiseAction = PayloadAction<{
  isAuthenticated: boolean,
  user: User
}>;

type LoginAction = PayloadAction<{
  user: User
}>;

export interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: User | null;
};

const sliceName = 'auth';

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    initialise(state: AuthState, action: InitialiseAction) {
      const { isAuthenticated, user } = action.payload;

      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.isInitialised = true;
    },
    login(state: AuthState, action: LoginAction) {
      const { user } = action.payload;

      state.isAuthenticated = true;
      state.user = user;
    },
    logout(state: AuthState) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const {
  initialise,
  login,
  logout
} = slice.actions;

export const { reducer: authReducer } = slice;

export default slice;