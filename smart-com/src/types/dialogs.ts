import type { EntityById, EntitiesById } from './common';

export type Dialog = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: {
    small: string | null;
    large: string | null;
  }
};

export type DialogById<T = {}> = EntityById<Dialog, T>;
export type DialogsById = EntitiesById<DialogById>;

export type Message = {
  addedAt: string
  body: string
  id: string
  recipientId: number
  senderId: number
  senderName: string
  translatedBody: unknown
  viewed: boolean
};

export type MessageById<T = {}> = EntityById<Message, T>;
export type MessagesById = EntitiesById<MessageById>;