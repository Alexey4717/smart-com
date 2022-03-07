import type { RootState } from '../index';

export const messagesSelector = ({ chat }: RootState) => chat.messages;

export const statusSelector = ({ chat }: RootState) => chat.status;

export const errorsSelector = ({ chat }: RootState) => chat.errors;