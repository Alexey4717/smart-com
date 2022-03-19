import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Avatar
} from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    margin: '0 10px'
  },
}));

export const Heading = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  '& > *:nth-last-of-type': {
    flexGrow: 1
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  position: 'relative',
  zIndex: 1,
  margin: '0 0 -150px 40px',
  [theme.breakpoints.down('md')]: {
    order: 2,
    marginLeft: 0
  },
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 300,
  height: 300,
  border: `10px solid ${theme.palette.background.default}`
}));

export const AddPhoto = styled('label')(({ theme }) => ({
  position: 'absolute',
  right: '10%',
  top: '10%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: '2px',
  backgroundColor: theme.palette.primary.main,
  minWidth: '45px',
  minHeight: '45px',
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  border: `3px solid ${theme.palette.background.default}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'gray'
  }
}));

export const FullName = styled(Typography)(({ theme }) => ({
  fontSize: '60px',
  marginLeft: 40,
  [theme.breakpoints.down('lg')]: {
    fontSize: 32,
    paddingBottom: 10
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: 0
  },
}));

export const ProfileItems = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 16,
  [theme.breakpoints.down('xl')]: {
    flexDirection: 'column'
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '16px 16px 0 0'
  },
}));

export const MainInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexBasis: '40%',
  [theme.breakpoints.down('xl')]: {
    flexDirection: 'row',
    paddingBottom: 20,
    flexBasis: '100%'
  },
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingBottom: 0
  },
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    paddingTop: 120,
    paddingBottom: 20
  },
}));

export const StatusWrapper = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  fontSize: 30,
  padding: '0 40px 0 360px',
  [theme.breakpoints.down('xl')]: {
    padding: '140px 0 0 0',
    textAlign: 'left',
    flexBasis: '80%'
  },
  [theme.breakpoints.down('lg')]: {
    textAlign: 'right',
    padding: '0 0 0 360px',
    flexBasis: 'auto'
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'left',
    paddingLeft: 0,
    fontSize: 24
  },
}));

export const SocialsHeading = styled(Typography)(({ theme }) => ({
  paddingBottom: 16,
  [theme.breakpoints.down('xl')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('lg')]: {
    textAlign: 'right',
    fontSize: 24,
    padding: '16px 0 8px'
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'left'
  },
}))

export const FormHeading = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  [theme.breakpoints.down('lg')]: {
    paddingTop: 20
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 24,
    paddingTop: 10
  },
}));

export const FormItems = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingTop: 24
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  textDecoration: 'underline',
  flexBasis: '25%',
  [theme.breakpoints.down('md')]: {
    flexBasis: '35%'
  },
}));

export const FormItem = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  flexBasis: '75%',
  paddingLeft: 10,
  [theme.breakpoints.down('md')]: {
    flexBasis: '65%'
  },
}));

export const LookingForAJobItem = styled(Box)({
  display: 'inline-flex',
  alugnItems: 'center',
  fontWeight: 'bold',
  '& > svg': {
    width: '15px',
    marginRight: 5
  }
});