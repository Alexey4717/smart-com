import type { RootState } from '../index';

export const dialogsSelector = ({ dialogs }: RootState) => dialogs.dialogs;

export const messagesSelector = ({ dialogs }: RootState) => dialogs.messages;

export const totalCountSelector = ({ dialogs }: RootState) => dialogs.messages.totalCount;

export const statusSelector = ({ dialogs }: RootState) => dialogs.status;

export const errorsSelector = ({ dialogs }: RootState) => dialogs.errors;