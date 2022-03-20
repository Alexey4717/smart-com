import type { RootState } from '../index';

export const dialogsIdsSelector = ({ dialogs }: RootState) => dialogs.dialogs.ids;

export const getDialogByIdSelector = (id: string) =>
  ({ dialogs }: RootState) => dialogs.dialogs.byId[id];

export const messagesIdsSelector = ({ dialogs }: RootState) => dialogs.messages.ids;

export const getmessageByIdSelector = (id: string) =>
  ({ dialogs }: RootState) => dialogs.messages.byId[id];

export const totalCountSelector = ({ dialogs }: RootState) => dialogs.totalMessagesCount;

export const statusSelector = ({ dialogs }: RootState) => dialogs.status;

export const errorsSelector = ({ dialogs }: RootState) => dialogs.errors;