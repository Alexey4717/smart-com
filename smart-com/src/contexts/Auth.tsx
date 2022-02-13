import {
  createContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import type { FC } from 'react';
//import { gql } from "@apollo/client";
import { useDispatch, useSelector } from 'store';
import type { RootState } from 'store';
import type { AuthState } from 'store/slices/Auth';
import type { AppState } from 'store/slices/app';
import { setAppInitialized } from 'store/slices/app';
import {
  initialise as storeInitialise,
  login as storeLogin,
  logout as storeLogout
} from 'store/slices/Auth';
import { useSnackbar } from 'notistack';
import SplashScreen from 'components/SplashScreen';
//import { setSession } from 'utils/auth';
//import { mutate, query } from 'utils/apollo';
import type { User } from 'types/user';
import { authAPI } from 'api';
import { StringMappingType } from 'typescript';
//import type { TokenPair } from 'utils/auth';

interface AuthContextValue {
  login: (username: string, password: StringMappingType) => Promise<void>;
  logout: () => void;
};

// interface LoginResponse {
//   auth: TokenPair
// };

const AuthContext = createContext<AuthContextValue>({
  login: () => Promise.resolve(),
  logout: () => { },
});

//const authSelector = ({ auth }: RootState) => auth;

// const ME = gql`
//   query getMe {
//     me {
//       id,
//       username,
//       firstName,
//       lastName,
//       middleName
//       role
//     }
//   }
// `;

// const LOGIN = gql`
//   mutation login($login: String!, $password: String!) {
//     auth(login: $login, password: $password) {
//       refreshToken
//       accessToken
//     }
//   }
// `;

export const AuthProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  //const [isFetching, setIsFething] = useState<boolean>(false);

  const initSelector = ({ app }: RootState) => app;
  const authSelector = ({ auth }: RootState) => auth;
  const { isAppInitialized } = useSelector<AppState>(initSelector);
  const { isInitialised } = useSelector<AuthState>(authSelector);

  console.log('isAppInitialized', isAppInitialized);
  console.log('isInitialised', isInitialised)

  // const login = useCallback(async (
  //   email: string,
  //   password: StringMappingType
  // ) => {
  //   try {
  //     const {
  //       data: {
  //         resultCode,
  //         messages
  //       }
  //     } = await authAPI.login(email, password);

  //     if (resultCode === 0) {
  //       const {
  //         data: myData
  //       } = await authAPI.me()

  //       dispatch(storeLogin({
  //         user: myData
  //       }));

  //       enqueueSnackbar(
  //         'Логинизация успешна',
  //         { variant: 'success' }
  //       );
  //     } else {
  //       throw new Error(messages)
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(
  //       `Возникла ошибка при логинизации пользователя${error ? (
  //         ': ' + error
  //       ) : (
  //         '.'
  //       )}`,
  //       { variant: 'error' }
  //     );
  //   }
  // }, [dispatch]);

  const login = async (
    email: string,
    password: StringMappingType
  ) => {
    const {
      data: {
        resultCode,
        messages
      }
    } = await authAPI.login(email, password);

    const {
      data: myData
    } = await authAPI.me()

    dispatch(storeLogin({
      user: myData
    }));
  };

  const logout = () => {
    dispatch(storeLogout());
  };

  useEffect(() => {
    const initSession = async () => {
      try {
        const {
          data: myData
        } = await authAPI.me();

        if (myData.resultCode === 0) {
          dispatch(storeInitialise({
            isAuthenticated: true,
            user: myData
          }));
          dispatch(setAppInitialized());
          enqueueSnackbar(
            'Авторизация успешна',
            { variant: 'success' }
          );
        } else {
          throw new Error(myData.messages)
        }

      } catch (error) {
        //setSession(null, null);

        enqueueSnackbar(
          // `Возникла ошибка при инициализации пользователя${error ? (
          //   ': ' + error
          // ) : (
          //   '.'
          // )}`,
          `Возникла ошибка при инициализации пользователя ${error}`,
          { variant: 'error' }
        );

        dispatch(storeInitialise({
          isAuthenticated: false,
          user: null
        }));
      }
    };

    initSession();
  }, []);

  // if (!isAppInitialized) {
  //   return <SplashScreen />;
  // };

  if (!isInitialised) {
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