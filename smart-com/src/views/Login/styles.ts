import {
  CardContent,
  Container,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';

export const LoginPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

export const LoginContainer = styled(Container)({
  margin: 'auto'
});

export const LoginCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: 400,
}));

export const Heading = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center'
  }
}));

export const CaptchaImage = styled('img')(() => ({
  display: 'block',
  margin: '10px auto'
}));