import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataLoadingStates } from 'types/utility';
import type { ContactsType, PhotosType, ProfileType } from 'types/profile';
import { profileAPI } from '../api/profile';

interface Profile extends ProfileType {
  contacts: ContactsType;
  photos: PhotosType;
};

export interface ProfileState {
  status: DataLoadingStates;
  errors: string | string[];
  profile: Profile
};

const sliceName = 'profile';

const initialState: ProfileState = {
  status: DataLoadingStates.IDLE,
  errors: null,
  profile: {
    userId: null,
    lookingForAJob: null,
    lookingForAJobDescription: null,
    fullName: null,
    contacts: {
      github: null,
      vk: null,
      facebook: null,
      instagram: null,
      twitter: null,
      website: null,
      youtube: null,
      mainLink: null
    },
    photos: {
      small: null,
      large: null
    },
    aboutMe: null,
    userStatus: null
  }
};

export const getProfileById = createAsyncThunk<ProfileType, number>(
  // @ts-ignore
  `${sliceName}/getProfileById`, async (id) => {
    const response = await profileAPI.getProfile(id);
    const userStatus = await profileAPI.getStatus(id);
    // @ts-ignore
    response.userStatus = userStatus;
    return response;
  }
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setStatus(state: ProfileState, action) {
      state.profile.userStatus = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getProfileById.pending, (state) => {
        state.status = DataLoadingStates.LOADING;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = DataLoadingStates.IDLE;
      })
      .addCase(getProfileById.rejected, (state, { error }) => {
        state.errors = error.message;
        state.status = DataLoadingStates.ERROR;
      })
  }
});

export const {
  setStatus
} = slice.actions;

export const { reducer: profileReducer } = slice;

export default slice;