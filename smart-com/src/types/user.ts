export type AuthUser = {
  id: number,
  login: string,
  email:string,
};

export type PhotosType = {
  small: string | null
  large: string | null
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}