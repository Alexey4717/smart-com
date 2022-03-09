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

export type Messages = {
  items: [] //исправить
  totalCount: number
};