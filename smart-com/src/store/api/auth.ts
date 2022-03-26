import { StringMappingType } from 'typescript';
import { instance, APIResponseType, ResultCodeForCapcthaEnum, ResultCodesEnum } from "./";

export type MeResponseDataType = {
    id: number
    email: string
    login: string
};

type LoginResponseDataType = {
    userId: number
};

export const authAPI = {
    me() {
        return instance.get<
            APIResponseType<MeResponseDataType>
        >(`auth/me`).then(res => res.data);
    },
    login(
        email: string,
        password: StringMappingType,
        rememberMe = false,
        captcha: null | string = null
    ) {
        return instance.post<
            APIResponseType<
                LoginResponseDataType,
                ResultCodesEnum | ResultCodeForCapcthaEnum
            >
        >(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`);
    }
};