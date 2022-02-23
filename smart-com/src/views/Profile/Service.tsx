import {
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/system';
import { SocialIcon } from 'react-social-icons';

const Service = ({ name, link }) => {
  const { palette } = useTheme();
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
        <SocialIcon 
          network={name} 
          bgColor={palette.primary.main} 
        />
      </ListItemIcon>
      <ListItemText primary={link} />
    </ListItemButton>
  )
};

export default Service;