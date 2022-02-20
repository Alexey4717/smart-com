import type { FC } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)(() => ({
  fontFamily: "'Anton', sans-serif",
  marginLeft: '20px',
  textTransform: 'uppercase',
  fontSize: '40px',
  lineHeight: 1,
  verticalAlign: 'middle'
}));

const AppTitle: FC = () => (
  <Title>
    Smart Community
  </Title>
);

export default AppTitle;
