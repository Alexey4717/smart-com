import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import paths from 'routing/paths';
import type { Section } from './types';

const {
  profile: profilePath,
  dialogs: dialogsPath,
  users: usersPath,
  settings: settingsPath
} = paths;

const sections: Section[] = [
  {
    title: 'Профиль',
    icon: AccountCircleIcon,
    href: profilePath
  },
  {
    title: 'Сообщения',
    icon: ChatIcon,
    href: dialogsPath
  },
  {
    title: 'Пользователи',
    icon: PeopleIcon,
    href: usersPath
  },
  {
    title: 'Настройки',
    icon: SettingsIcon,
    href: settingsPath
  },
];

export default sections;
