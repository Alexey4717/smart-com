import {
  useState,
  useCallback
} from 'react';
import type { FC, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useAuth from 'hooks/useAuth';
import {
  DashboardLayout,
  Wrapper,
  CentralPanel
} from './styles';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';

interface DashboardLayoutProps {
  children?: ReactNode;
};

const Dashboard: FC<DashboardLayoutProps> = ({ children }) => {
  const history = useHistory();
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const handleMobileClose = useCallback(
    () => setMobileNavOpen(false),
    [setMobileNavOpen],
  );

  const handleLogout = useCallback(() => {
    try {
      logout();
      history.push('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('An error occurred while logging out', {
        variant: 'error',
      });
    }
  }, [logout, history, enqueueSnackbar]);

  return (
    <DashboardLayout>
      <TopBar
        onLogoutClick={handleLogout}
      />
      <Wrapper>
        <LeftBar
          onMobileClose={handleMobileClose}
          openMobile={isMobileNavOpen}
        />
        <CentralPanel>
          {children}
        </CentralPanel>
        <RightBar />
      </Wrapper>
    </DashboardLayout>
  );
};

export default Dashboard;