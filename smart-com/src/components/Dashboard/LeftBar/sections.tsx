import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import paths from 'routing/paths';
import type { Section } from './types';

const {
  profile: profilePath,
  chat: chatPath,
  users: usersPath
} = paths;

const sections: Section[] = [
  {
    title: 'Профиль',
    icon: AccountCircleIcon,
    href: profilePath
  },
  {
    title: 'Чат',
    icon: ChatIcon,
    href: chatPath
  },
  {
    title: 'Пользователи',
    icon: PeopleIcon,
    href: usersPath
  }
];

export default sections;
