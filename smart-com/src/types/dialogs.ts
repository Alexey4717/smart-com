export type Message = {
  id?: string;
  userId?: number;
  userName: string;
  message: string;
  photo: string;
  isMyMessage?: boolean;
};