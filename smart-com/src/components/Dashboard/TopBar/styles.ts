import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  flexBasis: '250px',
  zIndex: theme.zIndex.drawer + 101,
  boxShadow: 'none',
  backgroundColor: theme.palette.primary.main
}));

export const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  minHeight: 64,
  [theme.breakpoints.down('sm')]: {
    minHeight: 48,
    padding: 0
  },
}));

export const NameItem = styled(Typography)({
  fontFamily: "'Anton', sans-serif",
  fontSize: '18px',
  lineHeight: 1,
  verticalAlign: 'middle',
});

export const Title = styled(NameItem)(({ theme }) => ({
  marginLeft: '20px',
  textTransform: 'uppercase',
  fontSize: '40px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  }
}));

export const AppLogo = styled('img')(() => ({
  height: '50px',
  marginTop: '2px'
}));