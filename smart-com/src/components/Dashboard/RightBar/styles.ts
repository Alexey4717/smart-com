import { styled } from '@mui/material/styles';
import {
  Avatar as MuiAvatar,
  Box as MuiBox
} from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  flexBasis: '250px',
  margin: '10px 10px 10px 0',
  [theme.breakpoints.down('md')]: {
    flexBasis: '200px'
  },
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 0,
    zIndex: 10
  },
}));

export const Header = styled('span')(({ theme }) => ({
  display: 'block',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  borderRadius: ' 10px 10px 0 0',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0
  },
}));

export const Box = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '500px',
  overflowY: 'scroll',
  padding: '5px',
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '0 0 10px 10px',
  '&::-webkit-scrollbar-thumb': {
    border: `5px solid white`
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    overflowX: 'scroll',
    overflowY: 'auto',
    height: '80px',
    borderRadius: 0,
    border: 'none'
  },
}));

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.main,
  margin: '3px',
  borderRadius: '35px',
  padding: '5px',
  [theme.breakpoints.down('md')]: {
    padding: '3px'
  },
}));

export const Items = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 16px',
  [theme.breakpoints.down('md')]: {
    width: 100
  },
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 55,
  height: 55,
  [theme.breakpoints.down('md')]: {
    width: 40,
    height: 40,
    marginLeft: '3px'
  },
}));

export const NameItem = styled('span')(({ theme }) => ({
  display: 'block',
  maxWidth: '110px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    maxWidth: 80
  },
}));