import type { FC } from 'react';
import {
  Box,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ScreenContainer = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  left: 0,
  padding: theme.spacing(3),
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 2000,
}));

const SplashScreen: FC = () => (
  <ScreenContainer>
    <Box width={400}>
      <LinearProgress />
    </Box>
  </ScreenContainer>
);

export default SplashScreen;