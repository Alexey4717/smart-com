import type { FC } from 'react';
import { styled } from '@mui/material/styles';

const AppLogo = styled('img')(() => ({
  height: '50px',
  marginTop: '2px'
}));

const Logo: FC = () => (
  <AppLogo
    alt="НО РАО"
    src="/static/no_rao_logo.png"
  />
);

export default Logo;
