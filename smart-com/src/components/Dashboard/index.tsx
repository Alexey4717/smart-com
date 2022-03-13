import {
  useState,
  useCallback,
  useMemo
} from 'react';
import type { FC, ReactNode } from 'react';
import { useTheme } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useAuth from 'hooks/useAuth';
import useElementWidth from 'hooks/useElementWidth';
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
  const { breakpoints } = useTheme();
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
      enqueueSnackbar('Возникла ошибка при выходе из системы', {
        variant: 'error',
      });
    }
  }, [logout, history, enqueueSnackbar]);

  const [ref, width] = useElementWidth();

  const isMoreLg = useMemo(() => (
    width > breakpoints.values.lg
  ), [width]);

  const isLessSm = useMemo(() => (
    width < breakpoints.values.sm
  ), [width]);

  return (
    <DashboardLayout ref={ref}>
      <TopBar
        onLogoutClick={handleLogout}
      />
      <Wrapper>
        <LeftBar
          onMobileClose={handleMobileClose}
          openMobile={isMobileNavOpen}
          isMoreLg={isMoreLg}
          isLessSm={isLessSm}
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