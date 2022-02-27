import {
  useState,
  useCallback
} from 'react';
import type { FC, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import NavBar from './NavBar';
import TopBar from './TopBar';
import Page from '../Page';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = styled(Page)(() => ({
  display: 'flex',
  height: '100%',
  width: '100%',
}));

const Wrapper = styled(Page)(() => ({
  display: 'flex',
  flex: '1 1 auto',
  paddingTop: 64,
}));

const SidePanel = styled(Page)(() => ({
  flexBasis: '250px'
}));

const CentralPanel = styled(Page)(() => ({
  display: 'flex',
  flex: '1 1 calc(100% - 500px)',
}));

const Content = styled(Page)(() => ({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
}));

const Dashboard: FC<DashboardLayoutProps> = ({ children }) => {
  const history = useHistory();
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const handleMobileOpen = useCallback(
    () => setMobileNavOpen(true),
    [setMobileNavOpen],
  );

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

  return (
    <DashboardLayout>
      <TopBar
        onMobileNavOpen={handleMobileOpen}
        onLogoutClick={handleLogout}
      />
      <Wrapper>
        <SidePanel>
          <NavBar
            onMobileClose={handleMobileClose}
            openMobile={isMobileNavOpen}
          />
        </SidePanel>
        <CentralPanel>
          <Content>
            {children}
          </Content>
        </CentralPanel>
        <SidePanel>Правая панель</SidePanel>
      </Wrapper>
    </DashboardLayout>
  );
};

export default Dashboard;
