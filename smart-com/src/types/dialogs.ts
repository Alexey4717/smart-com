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

export type Messages = {
  items: Message[];
  totalCount: number;
};