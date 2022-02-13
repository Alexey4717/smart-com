import type { FC } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)(() => ({
  marginBottom: '3.213px',
  marginLeft: '40px',
  textTransform: 'uppercase',
  fontSize: '16px',
  lineHeight: 1,
  verticalAlign: 'middle'
}));

const AppTitle: FC = () => (
  <Title>
    Радиационный Контроль
  </Title>
);

export default AppTitle;
