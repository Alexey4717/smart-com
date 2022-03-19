import { styled } from '@mui/material/styles';
import Page from '../Page';

export const DashboardLayout = styled(Page)(() => ({
  display: 'flex',
  height: '100%',
  width: '100%',
}));

export const Wrapper = styled(Page)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  paddingTop: 64,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export const CentralPanel = styled(Page)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 calc(100% - 500px)',
  height: '100%',
  overflow: 'auto',
  [theme.breakpoints.down('md')]: {
    flexBasis: '100%',
    marginBottom: 103,
    '&::-webkit-scrollbar': { width: 0 }
  }
}));