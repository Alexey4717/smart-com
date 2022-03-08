import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ListItem
} from '@mui/material';
import { styled } from '@mui/system';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface NavItemProps {
  className?: string;
  href?: string;
  icon?: any;
  title: string;
};

const MenuItems = styled(ListItem)(() => ({
  display: 'flex',
  paddingTop: 0,
  paddingBottom: 0,
  '& > a': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'gray',
    textDecoration: 'none',
    width: '100%',
    marginTop: '20px',
  }
}));

const NavItem: FC<NavItemProps> = ({
  href,
  icon: Icon,
  title,
  ...rest
}) => {

  const activeLinkStyle = {
    color: 'white',
    backgroundColor: 'gray',
    borderRight: '5px solid #253858',
    fontWeight: 900,
    '& $title': {
      fontWeight: 500,
    }
  };

  return (
    <MenuItems
      disableGutters
      key={title}
      {...rest}
    >
      <NavLink
        activeStyle={activeLinkStyle}
        exact
        to={href}
      >
        <ListItem button>
        {Icon && (
          <ListItemIcon>
            <Icon
              sx={{ display: 'block', fontSize: '2rem' }}
              size="30"
            />
          </ListItemIcon>
          )}
          <Typography sx={{ fontSize: '24px' }} component="div" >
            <ListItemText primary={title} />
          </Typography>
        </ListItem>
      </NavLink>
    </MenuItems>
  );
};

export default NavItem;
