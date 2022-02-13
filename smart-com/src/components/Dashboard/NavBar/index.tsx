/* eslint-disable no-use-before-define */
import {
  useEffect,
  useMemo,
  FC,
  ReactElement,
} from 'react';
import {
  useLocation,
  matchPath,
} from 'react-router-dom';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  Hidden,
  List,
  ListSubheader,
  Typography,
  ListProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { RootState, useSelector } from 'store';
import NavItem from './NavItem';
import sections from './sections';
import type { Section, NavBarProps } from './types';

function renderSections(navSections: Section[]): ReactElement[] {
  return navSections.map((section) => {
    const {
      title,
      icon,
      href,
    } = section;
    return (
      <NavItem
        href={href}
        icon={icon}
        key={title}
        title={title}
      />
    )
  })
}

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: 256,
  '& .MuiDrawer-paper': {
    width: 256,
    background: theme.palette.primary.main,
    color: theme.palette.text.lighter
  }
}));

const userSelector = ({ auth }: RootState) => auth.user;

const NavBar: FC<NavBarProps> = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const {
    login,
    email,
    id
  } = useSelector(userSelector);

  const userName = login;

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const sectionsList = useMemo(
    () => renderSections(sections),
    [sections],
  );

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        p={3}
        textAlign="center"
      >
        <Typography
          variant="h5"
          color="textPrimary"
          gutterBottom
        >
          {userName}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
        >
          {id}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
        >
          {email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        {sectionsList}
      </Box>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open
      variant="persistent"
    >
      {content}
    </Drawer>
  );
};

export default NavBar;