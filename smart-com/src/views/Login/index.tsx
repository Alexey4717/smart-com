import {
  Box,
  Card
} from '@mui/material';
import LoginForm from './LoginForm';
import { 
  LoginPage,
  LoginContainer,
  LoginCardContent,
  Heading
} from './styles';

const Login = () => (
  <LoginPage title="Вход в систему">
    <LoginContainer maxWidth="sm">
      <Card>
        <LoginCardContent>
          <Box mb={2}>
            <Heading
              color="textPrimary"
              gutterBottom
              variant="h2"
            >
              Вход в "Smart Com"
            </Heading>
            <Heading
              variant="body2"
              color="textSecondary"
            >
              Введите свои данные для входа в социальную сеть
            </Heading>
          </Box>
          <LoginForm />
        </LoginCardContent>
      </Card>
    </LoginContainer>
  </LoginPage>
);

export default Login;