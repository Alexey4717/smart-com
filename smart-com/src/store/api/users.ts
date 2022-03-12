import {GetItemsType, instance, APIResponseType} from './';

// term - user name string for searching
// friend - if true, then find only followed users, false - only not followed users, if omit parameter - all users

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get/*<GetItemsType>*/(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then(res => res.data)
    },
    follow(userId: string | number) {
        return instance.post/*<APIResponseType>*/(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: string | number) {
        return instance.delete(`follow/${userId}`).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    isFollow(userId: string | number) {
        return instance.get(`follow/${userId}`).then(res => res.data)
    }
};