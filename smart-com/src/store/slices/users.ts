import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataLoadingStates } from 'types/utility';
import type { GetUsersType } from 'store/api/users';
import type { UsersById } from 'types/user';
import { mapUsersToStoreEntities } from 'utils/usersUtils';
import { usersAPI } from '../api/users';

export interface UsersState {
  status: DataLoadingStates;
  errors: string | string[];
  pageSize: number,
  totalUsersCount: number,
  currentPage: number,
  users: {
    ids: string[];
    byId: UsersById;
  }
};

const sliceName = 'users';

const initialState: UsersState = {
  status: DataLoadingStates.IDLE,
  errors: null,
  pageSize: 12,
  totalUsersCount: 0,
  currentPage: 1,
  users: {
    ids: [],
    byId: {}
  }
};

type GetUsersDataRequest = {
  currentPage?: number,
  pageSize?: number,
  term?: string,
  friend?: boolean
};

export const getUsersData = createAsyncThunk<GetUsersType, GetUsersDataRequest>(
  `${sliceName}/getUsersData`, async ({ 
    currentPage, pageSize, term, friend 
  }) => await usersAPI.getUsers(currentPage, pageSize, term, friend));

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCurrentPage(state: UsersState, action) {
      state.currentPage = action.payload;
    },
    followUser(state: UsersState, action) {
      const id: string = action.payload;
      state.users.byId[id].followed = true;
    },
    unfollowUser(state: UsersState, action) {
      const id: string = action.payload;
      state.users.byId[id].followed = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.status = DataLoadingStates.LOADING;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        const { items, totalCount } = action.payload;
        const {
          users,
          usersIds
        } = mapUsersToStoreEntities(items);

        state.users.byId = users;
        state.users.ids = usersIds;
        state.totalUsersCount = totalCount;
        state.status = DataLoadingStates.IDLE;
      })
      .addCase(getUsersData.rejected, (state, { error }) => {
        state.errors = error.message;
        state.status = DataLoadingStates.ERROR;
      })
  }
});

export const {
  setCurrentPage,
  followUser,
  unfollowUser
} = slice.actions;

export const { reducer: usersReducer } = slice;

export default slice;