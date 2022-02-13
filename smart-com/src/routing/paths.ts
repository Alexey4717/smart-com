const root: string = '/app';

const paths: Record<string, string> = {
  pageNotFound: '/404',

  /* GUEST */
  login: `/login`,

  /* AUTH */
  home: `${root}`,
  profile: `${root}/control/`,
  dialogs: `${root}/dialogs/`,
  users: `${root}/users/`,
  settings: `${root}/settings/`
};

export default paths;