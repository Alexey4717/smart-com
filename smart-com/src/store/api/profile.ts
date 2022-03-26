import { instance, APIResponseType } from './';
import type { PhotosType, ProfileType } from 'types/profile';

type SavePhotoResponseDataType = {
    photos: PhotosType
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<APIResponseType<ProfileType>>(`profile/` + userId)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<APIResponseType<Pick<ProfileType, 'userStatus'>>>(`profile/status/` + userId)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, { status: status })
            .then(res => res.data);
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(res => res.data);
    }
};