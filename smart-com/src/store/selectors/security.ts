import type { RootState } from '../index';

export const captchaUrlSelector = ({ auth }: RootState) => auth.captchaUrl;