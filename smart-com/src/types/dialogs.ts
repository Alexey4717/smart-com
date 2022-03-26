import type { EntityById, EntitiesById } from './common';

export type Dialog = {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: {
    small: string | null
    large: string | null
  }
};

export type DialogById<T = {}> = EntityById<Dialog, T>;
export type DialogsById = EntitiesById<DialogById>;

export type FullMessage = {
  addedAt: string
  body: string
  deletedByRecipient: boolean
  deletedBySender: boolean
  distributionId?: any
  id: string
  isSpam: boolean
  recipientId: number
  recipientName: string
  senderId: number
  senderName: string
  translatedBody?: any
  viewed: boolean
};

export type ShortMessage = Pick<
  FullMessage,
  'addedAt'
  | 'body'
  | 'id'
  | 'recipientId'
  | 'senderId'
  | 'senderName'
  | 'translatedBody'
  | 'viewed'
>;

export type MessageById<T = {}> = EntityById<ShortMessage, T>;
export type MessagesById = EntitiesById<MessageById>;