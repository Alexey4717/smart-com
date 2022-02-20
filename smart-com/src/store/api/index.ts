import * as axios from "axios";
import {UserType} from 'types/user';

export const instance = axios.default.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "487f1401-aac9-4a5c-b8ec-cca7e2b525af"
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
};

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
};

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
};