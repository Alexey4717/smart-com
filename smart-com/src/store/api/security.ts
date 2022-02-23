import {instance} from './';

export type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get/*<GetCaptchaUrlResponseType>*/(`security/get-captcha-url`).then(res => res.data);
    }
};