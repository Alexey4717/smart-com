import { instance, APIResponseType } from '.';
import type { Dialog, ShortMessage, FullMessage } from 'types/dialogs';

export type AllDialogsResponse = Dialog[];
export type AllMessagesResponse = {
    items: ShortMessage[];
    totalCount: number;
    error: string;
};

export const dialogsAPI = {
    startDialog(userId: number) {
        return instance.put<APIResponseType>(`dialogs/${userId}`)
            .then(res => res.data);
    },
    getAllDialogs() {
        return instance.get<AllDialogsResponse>(`dialogs`)
            .then(res => res.data);
    },
    getMessages(userId: number, page: number = 1, count: number = 10) {
        return instance.get<AllMessagesResponse>(`dialogs/${userId}/messages?page=${page}&count=${count}`)
            .then(res => res.data);
    },
    sendMessage(userId: number, message: string) {
        return instance.post<APIResponseType<FullMessage>>(`dialogs/${userId}/messages`, { body: message })
            .then(res => res.data)
    },
    deleteMessage(messageId: string) {
        return instance.delete<APIResponseType>(`dialogs/messages/${messageId}`)
            .then(res => res.data)
    },
    restoreMessage(messageId: string) {
        return instance.put<APIResponseType>(`dialogs/messages/${messageId}/restore`)
            .then(res => res.data)
    }
};