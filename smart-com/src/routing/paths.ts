const root: string = '/app';

const paths: Record<string, string> = {
  pageNotFound: '/404',

  /* GUEST */
  login: `/login`,

  /* AUTH */
  home: `${root}`,
  profile: `${root}/profile/`,
  dialogs: `${root}/dialogs/`,
  users: `${root}/users/`,
  settings: `${root}/settings/`
};

export default paths;