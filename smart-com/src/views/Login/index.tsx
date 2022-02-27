import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';
import LoginForm from './LoginForm';

const LoginPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const LoginContainer = styled(Container)({
  margin: 'auto'
});

const LoginCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: 400,
}));

const Login = () => (
  <LoginPage title="Вход в систему">
    <LoginContainer maxWidth="sm">
      <Card>
        <LoginCardContent>
          <Box mb={2}>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h2"
            >
              Вход в "Smart Com"
            </Typography>
            <Typography
              variant="body2"
              component="span"
              color="textSecondary"
            >
              Введите свои данные для входа в социальную сеть
            </Typography>
          </Box>
          <LoginForm />
        </LoginCardContent>
      </Card>
    </LoginContainer>
  </LoginPage>
);

export default Login;