const root: string = '/app';

const paths: Record<string, string> = {
  pageNotFound: '/404',

  /* GUEST */
  login: `/login`,

  /* AUTH */
  home: `${root}`,
  profile: `${root}/profile/`,
  chat: `${root}/chat/`,
  users: `${root}/users/`
};

export default paths;