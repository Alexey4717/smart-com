import { 
  object as yupObject, 
  string as yupString, 
  boolean as yupBoolean 
} from 'yup';

export const validationSchema = yupObject().shape({
  fullName: yupString().max(100),
  aboutMe: yupString().max(255).required(),
  lookingForAJob: yupBoolean(),
  lookingForAJobDescription: yupString().max(255),
  github: yupString().max(100),
  vk: yupString().max(100),
  facebook: yupString().max(100),
  instagram: yupString().max(100),
  twitter: yupString().max(100),
  website: yupString().max(100),
  youtube: yupString().max(100),
  mainLink: yupString().max(100),
});

export const formInitialValues = ({
  userId,
  lookingForAJob,
  lookingForAJobDescription,
  fullName,
  aboutMe,
  contacts: {
    github,
    vk,
    facebook,
    instagram,
    twitter,
    website,
    youtube,
    mainLink
  }
}) => {
  return {
    userId,
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    aboutMe,
    contacts: {
      github,
      vk,
      facebook,
      instagram,
      twitter,
      website,
      youtube,
      mainLink
    },
    submit: null,
  }
};

export const fields = [
  {
    type: 'text',
    name: 'fullName',
    label: 'Имя пользователя',
  },
  {
    type: 'text',
    name: 'aboutMe',
    label: 'Обо мне',
  },
  {
    type: 'checkbox',
    name: 'lookingForAJob',
    label: 'В поиске работы',
  },
  {
    type: 'text',
    name: 'lookingForAJobDescription',
    label: 'Данные анкеты',
  }
];

export const contacts = [
  {
    name: 'contacts.github',
    label: 'Ссылка на github',
  },
  {
    name: 'contacts.vk',
    label: 'Ссылка на vkontakte',
  },
  {
    name: 'contacts.facebook',
    label: 'Ссылка на facebook',
  },
  {
    name: 'contacts.instagram',
    label: 'Ссылка на instagram',
  },
  {
    name: 'contacts.twitter',
    label: 'Ссылка на twitter',
  },
  {
    name: 'contacts.website',
    label: 'Ссылка на website',
  },
  {
    name: 'contacts.youtube',
    label: 'Ссылка на youtube-канал',
  },
  {
    name: 'contacts.mainLink',
    label: 'Ссылка на mainLink',
  },
];
