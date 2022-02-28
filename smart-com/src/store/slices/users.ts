import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataLoadingStates } from 'types/utility';
import type { ContactsType, PhotosType, ProfileType } from 'types/profile';
import type { GetItemsType as UsersResponse, APIResponseType } from 'store/api';
import type { UserType, UsersById } from 'types/user';
import { mapPlacesToStoreEntities } from 'utils/usersUtils';
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
  pageSize: 10,
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
  friend?: null | boolean
}

export const getUsersData = createAsyncThunk/*<UsersResponse>*/(
  `${sliceName}/getUsersData`,
  async (
    { currentPage, pageSize, term, friend }: GetUsersDataRequest
  ): Promise<UsersResponse> => {
    const response = await usersAPI.getUsers(currentPage, pageSize, term, friend);
    return response;
  });

type FollowingUserRequest = {
  userId: string
};

type FollowingUserResponse = APIResponseType & {
  data: {
    id?: string
  }
}

export const followUser = createAsyncThunk/*<UsersResponse>*/(
  `${sliceName}/followUser`,
  async (
    { userId }: FollowingUserRequest
  ): Promise<FollowingUserResponse> => {
    const response = await usersAPI.follow(userId);
    //response.data.id = userId;
    return response;
  });

export const unfollowUser = createAsyncThunk/*<UsersResponse>*/(
  `${sliceName}/unfollowUser`,
  async (
    { userId }: FollowingUserRequest
  ): Promise<FollowingUserResponse> => {
    const response = await usersAPI.unfollow(userId);
    //response.data.id = userId;
    return response;
  });

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCurrentPage(state: UsersState, action) {
      state.currentPage = action.payload;
    },
    // followUser(state: UsersState, action) {
    //   const { userId } =
    //   state.currentPage = action.payload;
    // },
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
        } = mapPlacesToStoreEntities(items);

        state.users.byId = users;
        state.users.ids = usersIds;
        state.totalUsersCount = totalCount;
        state.status = DataLoadingStates.IDLE;
      })
      .addCase(getUsersData.rejected, (state, { error }) => {
        state.errors = error.message;
        state.status = DataLoadingStates.ERROR;
      })
      .addCase(followUser.pending, (state) => {
        state.status = DataLoadingStates.LOADING;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        //const { data: { id } } = action.payload;

        console.log('action.payload', action.payload)
        //state.users.byId[id].followed = true;
        state.status = DataLoadingStates.IDLE;
      })
      .addCase(followUser.rejected, (state, { error }) => {
        state.errors = error.message;
        state.status = DataLoadingStates.ERROR;
      })
  }
});

export const {
  setCurrentPage
} = slice.actions;

export const { reducer: usersReducer } = slice;

export default slice;