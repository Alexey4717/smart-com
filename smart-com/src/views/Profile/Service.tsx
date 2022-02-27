import { ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/system';
import { SocialIcon } from 'react-social-icons';

const Service = ({ name, link }) => {
  const { palette } = useTheme();

  let networkName;
  if (!link || link === '') return <></>;

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
    <ListItemIcon>
      <a href={link} target="_blank">
        <SocialIcon
          style={{ width: '40px', height: '40px' }}
          network={networkName}
          bgColor={palette.primary.main}
        />
      </a>
    </ListItemIcon>
  )
};

export default Service;