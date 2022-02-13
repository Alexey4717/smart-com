import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  isAppInitialized: boolean;
}

const sliceName = 'app';

const initialState: AppState = {
  isAppInitialized: false
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setAppInitialized(state: AppState) {
      state.isAppInitialized = true;
    }
  }
});

export const { setAppInitialized } = slice.actions;

export const { reducer: appReducer } = slice;

export default slice;
