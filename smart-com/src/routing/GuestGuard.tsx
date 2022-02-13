import type { FC, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'store';
import type { RootState } from 'store';
import paths from 'routing/paths';

interface GuestGuardProps {
  children?: ReactNode;
}

const { app } = paths;

const authSelector = ({ auth }: RootState) => auth.isAuthenticated;

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const isAuthenticated = useSelector<boolean>(authSelector);

  if (isAuthenticated) {
    return <Redirect to={app} />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default GuestGuard;