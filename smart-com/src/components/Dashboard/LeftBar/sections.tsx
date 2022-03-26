import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import paths from 'routing/paths';
import type { Section } from './types';

const {
  profile: profilePath,
  chat: chatPath,
  users: usersPath,
  dialogs: dialogsPath
} = paths;

const sections: Section[] = [
  {
    title: 'Profile',
    icon: AccountCircleIcon,
    href: profilePath
  },
  {
    title: 'Dialogs',
    icon: ChatIcon,
    href: dialogsPath
  },
  {
    title: 'Users',
    icon: PeopleIcon,
    href: usersPath
  },
  {
    title: 'Common chat',
    icon: ForumIcon,
    href: chatPath
  }
];

export default sections;
