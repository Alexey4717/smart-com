import type { FC } from 'react';
import { styled } from '@mui/material/styles';

const AppLogo = styled('img')(() => ({
  height: '50px',
  marginTop: '2px'
}));

const Logo: FC = () => (
  <AppLogo
    alt="Smart Com"
    src="/static/logo.png"
  />
);

export default Logo;
