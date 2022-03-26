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
  <LoginPage title="Login">
    <LoginContainer maxWidth="sm">
      <Card>
        <LoginCardContent>
          <Box mb={2}>
            <Heading
              color="textPrimary"
              gutterBottom
              variant="h2"
            >
              Sign in "Smart Com"
            </Heading>
            <Heading
              variant="body2"
              color="textSecondary"
            >
              Enter your social network login details
            </Heading>
          </Box>
          <LoginForm />
        </LoginCardContent>
      </Card>
    </LoginContainer>
  </LoginPage>
);

export default Login;