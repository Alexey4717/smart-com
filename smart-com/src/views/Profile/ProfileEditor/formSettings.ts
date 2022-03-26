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
    label: 'User name',
  },
  {
    type: 'text',
    name: 'aboutMe',
    label: 'About me',
  },
  {
    type: 'checkbox',
    name: 'lookingForAJob',
    label: 'Looking for a job',
  },
  {
    type: 'text',
    name: 'lookingForAJobDescription',
    label: 'Looking for a job description',
  }
];

export const contacts = [
  {
    name: 'contacts.github',
    label: 'Link to github',
  },
  {
    name: 'contacts.vk',
    label: 'Link to vkontakte',
  },
  {
    name: 'contacts.facebook',
    label: 'Link to facebook',
  },
  {
    name: 'contacts.instagram',
    label: 'Link to instagram',
  },
  {
    name: 'contacts.twitter',
    label: 'Link to twitter',
  },
  {
    name: 'contacts.website',
    label: 'Link to website',
  },
  {
    name: 'contacts.youtube',
    label: 'Link to youtube-channel',
  },
  {
    name: 'contacts.mainLink',
    label: 'Link to mainLink',
  },
];
