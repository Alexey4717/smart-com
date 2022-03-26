import type { EntityById, EntitiesById } from './common';

export type AuthUser = {
  id: number
  login: string
  email:string
};

export type PhotosType = {
  small: string | null
  large: string | null
};

export type UserType = {
  id: number
  name: string
  uniqueUrlName: string
  status: string
  photos: PhotosType
  followed: boolean
};

export type UserById<T = {}> = EntityById<UserType, T>;
export type UsersById = EntitiesById<UserById>;