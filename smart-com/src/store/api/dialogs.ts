import {GetItemsType, instance, APIResponseType} from '.';

export const dialogsAPI = {
    startDialog(userId: number) {
        return instance.put/*<APIResponseType>*/(`dialogs/${userId}`).then(res => res.data);
    },
    getAllDialogs() {
        return instance.get(`dialogs`).then(res => res)/* as Promise<APIResponseType>*/
    },
    getMessages(userId: number, page: number = 1, count: number = 10) {
        return instance.get(`dialogs/${userId}/messages?page=${page}&count=${count}`).then(res => res.data);
    },
    sendMessage(userId: number, message: string) {
        return instance.post(`dialogs/${userId}`, {body: message}).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    getInfoIsMessageViewed(messageId: number) {
        return instance.get(`dialogs/messages/${messageId}/viewed`).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    moveMessageToSpam(messageId: number) {
        return instance.post(`dialogs/messages/${messageId}/spam`).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    deleteMessage(messageId: number) {
        return instance.delete(`dialogs/messages/${messageId}`).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    restoreMessage(messageId: number) {
        return instance.put(`dialogs/messages/${messageId}/restore`).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    getNewestMessages(userId: number, date: string) {
        return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    getNewMessagesCount() {
        return instance.get(`dialogs/messages/new/count`).then(res => res.data)/* as Promise<APIResponseType>*/
    }
};