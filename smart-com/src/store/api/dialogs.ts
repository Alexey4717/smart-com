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
        return instance.post(`dialogs/${userId}/messages`, {body: message}).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    deleteMessage(messageId: string) {
        return instance.delete(`dialogs/messages/${messageId}`).then(res => res.data)/* as Promise<APIResponseType>*/
    },
    restoreMessage(messageId: string) {
        return instance.put(`dialogs/messages/${messageId}/restore`).then(res => res.data)/* as Promise<APIResponseType>*/
    }
};