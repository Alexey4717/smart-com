import * as axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const instance = axios.default.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": apiKey
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
};

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: string[]
    resultCode: RC
    fieldsErrors?: string[]
};