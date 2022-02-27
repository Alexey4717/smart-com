import type { RootState } from '../index';

export const authUserIdSelector = ({ auth }: RootState) => auth.user.id;