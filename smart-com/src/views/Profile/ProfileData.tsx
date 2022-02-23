import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import View from 'components/View';
import { 
  Alert, 
  Box, 
  Typography, 
  List, 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/system';
import { 
  errorsSelector, 
  statusSelector, 
  profileSelector 
} from 'store/selectors/profile';
import { authUserIdSelector } from 'store/selectors/auth';
import { getProfileById } from 'store/slices/profile';
import { DataLoadingStates } from 'types/utility';
import Service from './Service';

const ProfileData = () => {

  const { 
    fullName, 
    lookingForAJob,
    lookingForAJobDescription,
    contacts,
    photos,
    aboutMe
  } = useSelector(profileSelector);

  const services = Object.entries(contacts)

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <img src={photos.large} alt="photo" />
      <Typography>{fullName}</Typography>
      <Typography>{lookingForAJob}</Typography>
      <Typography>{lookingForAJobDescription}</Typography>
      <Typography>{aboutMe}</Typography>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Ссылки на сторонные сервисы" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {services.map(service => (
              <Service name={service[0]} link={service[1]} />
            ))}
          </List>
        </Collapse>
      </List>
    </>
  )
};

export default ProfileData;