import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar as MuiToolbar,
  SvgIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AppTitle from './AppTitle';
import Logo from './Logo';

interface TopBarProps {
  className?: string;
  onMobileNavOpen?: () => void;
  onLogoutClick: () => void;
}

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 101,
  boxShadow: 'none',
  backgroundColor: theme.palette.primary.main
}));

const Toolbar = styled(MuiToolbar)(() => ({
  minHeight: 64,
}));

const TopBar: FC<TopBarProps> = ({
  onMobileNavOpen,
  onLogoutClick,
  ...rest
}) => (
  <AppBar {...rest}>
    <Toolbar>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <SvgIcon>
            <MenuIcon />
          </SvgIcon>
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Hidden>
      <AppTitle />
      <Box
        ml={2}
        flexGrow={1}
      />
      <Box ml={2}>
        <IconButton
          color="inherit"
          onClick={onLogoutClick}
        >
          <SvgIcon>
            <LogoutIcon />
          </SvgIcon>
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default TopBar;
