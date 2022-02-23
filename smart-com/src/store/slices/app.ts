import { createSlice } from '@reduxjs/toolkit';
import { getAuthUserData } from './auth';

export interface AppState {
  initialized: boolean;
}

const sliceName = 'app';

const initialState: AppState = {
  initialized: false
};

export const initializeApp = () => (dispatch) => {
  
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    
    dispatch(setAppInitialized(true));
  });
}

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setAppInitialized(state: AppState, action) {
      state.initialized = action.payload;
    }
  }
});

export const { setAppInitialized } = slice.actions;

export const { reducer: appReducer } = slice;

export default slice;
