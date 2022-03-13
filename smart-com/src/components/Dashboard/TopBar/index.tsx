import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RootState, useSelector } from 'store';
import {
  Box,
  Hidden,
  IconButton,
  SvgIcon
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Toolbar,
  NameItem,
  Title,
  AppLogo
} from './styles';

interface TopBarProps {
  className?: string;
  onMobileNavOpen?: () => void;
  onLogoutClick: () => void;
};

const TopBar: FC<TopBarProps> = ({
  onMobileNavOpen,
  onLogoutClick,
  ...rest
}) => {
  const userSelector = ({ auth }: RootState) => auth.user;
  const {
    login
  } = useSelector(userSelector);
  const userName = login;

  return (
    <AppBar {...rest}>
      <Toolbar>
        <Hidden mdDown>
          <RouterLink to="/">
            <AppLogo
              alt="Smart Com"
              src="/static/logo.png"
            />
          </RouterLink>
        </Hidden>
        <Title>
          Smart Community
        </Title>
        <Box
          ml={2}
          flexGrow={1}
        />
        <NameItem>
          {userName}
        </NameItem>
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
};

export default TopBar;
