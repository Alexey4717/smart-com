import { useState } from 'react';
import type { FC, ReactNode, ElementType, ReactElement } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Button as MuiButton,
  ListItem
} from '@mui/material';
import { styled } from '@mui/system';
import type { ButtonProps } from '@mui/material';

interface NavItemProps {
  className?: string;
  href?: string;
  icon?: any;
  title: string;
};

interface MenuButtonStyledProps {
  depth?: number
};

// type ButtonType = <C extends ElementType>(
//   props: ButtonProps<C, { component?: C, depth?: number }>
// ) => ReactElement;

const MenuItemLeaf = styled(ListItem)(() => ({
  display: 'flex',
  paddingTop: 0,
  paddingBottom: 0,
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  marginRight: theme.spacing(1),
}));

const Title = styled('span')(() => ({
  marginRight: 'auto',
}));

const NavItem: FC<NavItemProps> = ({
  href,
  icon: Icon,
  title,
  ...rest
}) => {

  const activeLinkStyle = {
    color: '#FFF',
    '& $title': {
      fontWeight: 500,
    },
    '& $icon': {
      color: '#FFF',
    },
  };

  return (
    <MenuItemLeaf
      disableGutters
      key={title}
      {...rest}
    >
      <RouterLink
        //activeStyle={activeLinkStyle}
        //component={RouterLink}
        //exact
        to={href}
      >
        {Icon && (
          <IconWrapper>
            <Icon
              sx={{ display: 'block' }}
              size="20"
            />
          </IconWrapper>
        )}
        <Title>
          {title}
        </Title>
      </RouterLink>
    </MenuItemLeaf>
  );
};

export default NavItem;
