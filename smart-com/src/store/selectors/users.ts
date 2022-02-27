import type { RootState } from '../index';

export const usersIdsSelector = ({ users }: RootState) => users.users.ids;

export const getUserByIdSelector = (id: string) =>
  ({ users }: RootState) => users.users.byId[id];

export const totalUsersCountSelector = ({ users }: RootState) => users.totalUsersCount;

export const currentPageSelector = ({ users }: RootState) => users.currentPage;

export const pageSizeSelector = ({ users }: RootState) => users.pageSize;

export const statusSelector = ({ users }: RootState) => users.status;

export const errorsSelector = ({ users }: RootState) => users.errors;