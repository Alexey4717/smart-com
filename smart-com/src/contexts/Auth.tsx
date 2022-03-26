import {
  createContext,
  useEffect
} from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'store';
import type { RootState } from 'store';
import type { AppState } from 'store/slices/app';
import {
  logout as storeLogout
} from 'store/slices/auth';
import { useSnackbar } from 'notistack';
import SplashScreen from 'components/SplashScreen';
import { authAPI } from 'store/api/auth';
import { StringMappingType } from 'typescript';
import { initializeApp } from 'store/slices/app';
import { getAuthUserData, getCapthaUrl } from 'store/slices/auth';
import { useHistory } from 'react-router-dom';

interface AuthContextValue {
  login: (username: string, password: StringMappingType) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const initSelector = ({ app }: RootState) => app;
  const { initialized } = useSelector<AppState>(initSelector);

  const login = async (
    email: string,
    password: StringMappingType,
    rememberMe: boolean = false,
    captcha: string | null = null
  ) => {
    try {
      const {
        resultCode,
        messages
      } = await authAPI.login(email, password, rememberMe, captcha);

      if (resultCode === 0) {
        dispatch(getAuthUserData());
        enqueueSnackbar(
          'Authorization is successful',
          { variant: 'success' }
        );
      } else {
        if (resultCode === 10) {
          dispatch(getCapthaUrl())
          enqueueSnackbar(
            'Please enter a valid captcha',
            { variant: 'warning' }
          );
        } else {
          const message = messages.length > 0 ? messages[0] : 'Unknown error';
          throw new Error(message)
        }
      }

    } catch (error) {
      enqueueSnackbar(
        `An authorization error has occurred: ${error}`,
        { variant: 'error' }
      );
    }

  };

  const logout = async () => {
    try {
      const {
        data: {
          resultCode,
          messages
        }
      } = await authAPI.logout();

      if (resultCode === 0) {
        dispatch(storeLogout());
        enqueueSnackbar(
          'User session ended successfully',
          { variant: 'success' }
        );
        history.push('/login/');
      } else if (messages.length) {
        const message = messages.length > 0 ? messages[0] : 'Unknown error';
        throw new Error(message);
      } else {
        throw new Error();
      }
    } catch (error) {
      const { errors } = error ?? {};
      enqueueSnackbar(
        `An error occurred while closing the user session: ${errors}`,
        { variant: 'error' }
      );
    }
  };

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!initialized) {
    return <SplashScreen />;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;