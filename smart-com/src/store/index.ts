import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import { authReducer } from './slices/auth';
import { appReducer } from './slices/app';
import { profileReducer } from './slices/profile';
import { usersReducer } from './slices/users';
import { chatReducer } from './slices/chat';
import { dialogsReducer } from './slices/dialogs';

const devTools = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    users: usersReducer,
    chat: chatReducer,
    dialogs: dialogsReducer
  },
  devTools
});

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;