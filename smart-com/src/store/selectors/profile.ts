import type { RootState } from '../index';

export const profileSelector = ({ profile }: RootState) => profile.profile;

export const statusSelector = ({ profile }: RootState) => profile.status;

export const errorsSelector = ({ profile }: RootState) => profile.errors;