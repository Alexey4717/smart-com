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
        const {
          userId,
          lookingForAJob,
          lookingForAJobDescription,
          fullName,
          contacts: {
            github,
            vk,
            facebook,
            instagram,
            twitter,
            website,
            youtube,
            mainLink
          },
          photos: {
            small,
            large
          },
          aboutMe,
          userStatus
        } = action.payload;
        state.profile.userId = userId;
        state.profile.lookingForAJob = lookingForAJob;
        state.profile.lookingForAJobDescription = lookingForAJobDescription;
        state.profile.fullName = fullName;
        state.profile.contacts.github = github;
        state.profile.contacts.vk = vk;
        state.profile.contacts.facebook = facebook;
        state.profile.contacts.instagram = instagram;
        state.profile.contacts.twitter = twitter;
        state.profile.contacts.website = website;
        state.profile.contacts.youtube = youtube;
        state.profile.contacts.mainLink = mainLink;
        state.profile.photos.small = small;
        state.profile.photos.large = large;
        state.profile.aboutMe = aboutMe;
        state.profile.userStatus = userStatus;
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