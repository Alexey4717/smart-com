import type { FC, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'store';
import type { RootState } from 'store';
import paths from 'routing/paths';

interface AuthGuardProps {
  children?: ReactNode;
}

const { login } = paths;

const authSelector = ({ auth }: RootState) => auth.isAuthenticated;

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useSelector<boolean>(authSelector);

  if (!isAuthenticated) {
    return <Redirect to={login} />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;