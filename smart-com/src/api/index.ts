import * as axios from "axios";

const instance = axios.default.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "487f1401-aac9-4a5c-b8ec-cca7e2b525af"
    }
})

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    getFollow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    },
    getUnfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId);
    } // код берется из profileAPI.getProfile
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append('image', file) // name: image в документации смотреть, в отправляемом объекте
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }

}

export const authAPI = {
    me () {
        return instance.get(`auth/me`);
    },
    login (email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout () {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    }
}