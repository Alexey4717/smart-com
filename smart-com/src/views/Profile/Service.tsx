import {
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/system';
import { SocialIcon } from 'react-social-icons';

const Service = ({ name, link }) => {
  const { palette } = useTheme();

  let networkName;
  let networkLink = !link || link === '' ? `Ссылка на ${name} не указана` : link;

  switch (name) {
    case 'mainLink':
      networkName = 'meetup';
      break;

    case 'website':
      networkName = 'dribbble';
      break;

    default:
      networkName = name;
      break;
  };

  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
        <SocialIcon
          style={{ width: '40px', height: '40px' }}
          network={networkName}
          bgColor={palette.primary.main}
        />
      </ListItemIcon>
      <ListItemText primary={networkLink} />
    </ListItemButton>
  )
};

export default Service;