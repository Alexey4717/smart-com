import { ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/system';
import { SocialIcon } from 'react-social-icons';

interface OwnProps {
  name: string
  link: string
};

const Service = ({ name, link }: OwnProps) => {
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
    <ListItemIcon sx={{ pt: 1 }}>
      <a href={link} target="_blank" rel="noreferrer">
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