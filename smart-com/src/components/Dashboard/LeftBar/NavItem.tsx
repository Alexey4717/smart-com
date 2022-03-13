import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItemText } from '@mui/material';
import {
  MenuItems,
  MenuItem,
  IconContainer,
  NavItemText,
  activeLinkStyle
} from './styles';

interface NavItemProps {
  className?: string;
  href?: string;
  icon?: any;
  title: string;
};

const NavItem: FC<NavItemProps> = ({
  href,
  icon: Icon,
  title,
  ...rest
}) => (
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
      <MenuItem>
        {Icon && (
          <IconContainer>
            <Icon
              sx={{
                display: 'block',
                fontSize: '2rem'
              }}
              size="30"
            />
          </IconContainer>
        )}
        <NavItemText>
          <ListItemText primary={title} />
        </NavItemText>
      </MenuItem>
    </NavLink>
  </MenuItems>
);

export default NavItem;
