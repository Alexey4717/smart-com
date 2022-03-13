import { 
  styled, 
  Theme, 
  CSSObject 
} from '@mui/material/styles';
import { 
  Box, 
  List, 
  ListItem,
  ListItemButton, 
  ListItemIcon
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { 
  AppBarProps as MuiAppBarProps 
} from '@mui/material/AppBar';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '92px',
    overflow: 'hidden'
  },
});

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexBasis: '250px',
  [theme.breakpoints.down('lg')]: {
    flexBasis: theme.spacing(7)
  },
  [theme.breakpoints.down('sm')]: {
    position: 'fixed',
    zIndex: 10
  },
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isLessSm?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isLessSm',
})<AppBarProps>(({ theme, open, isLessSm }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%'
    },
  }),
}));

export const NavList = styled(List)(({ theme }) => ({
  paddingTop: 100,
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    padding: '48px 0 0'
  }
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const MenuItems = styled(ListItem)({
  display: 'flex',
  paddingTop: 0,
  paddingBottom: 0,
  '& > a': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'gray',
    textDecoration: 'none',
    width: '100%'
  }
});

export const MenuItem = styled(ListItemButton)(({ theme }) => ({
  padding: '10px 16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export const IconContainer = styled(ListItemIcon)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto'
  }
}));

export const NavItemText = styled('div')(({ theme }) => ({
  fonstSize: 24,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
}));

export const activeLinkStyle = {
  color: 'white',
  backgroundColor: 'gray',
  fontWeight: 900,
  '& $title': {
    fontWeight: 500,
  }
};