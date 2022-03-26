import { instance, APIResponseType } from './';
import { UserType } from 'types/user';

export type GetUsersType = {
    items: UserType[]
    totalCount: number
    error: string | null
};

export const usersAPI = {
    getUsers(
        currentPage = 1,
        pageSize = 12,
        term: string = '',
        friend: null | boolean = null
    ) {
        return instance.get<GetUsersType>(`
            users?page=${currentPage}&count=${pageSize}&term=${term}
        ` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    follow(userId: string | number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: string | number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    isFollow(userId: string | number) {
        return instance.get<boolean>(`follow/${userId}`).then(res => res.data)
    }
};