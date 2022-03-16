import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import useMediaQuery from 'hooks/useMediaQuery';
import paths from 'routing/paths';

const dialogsPath = paths.dialogs;

interface OwnProps {
  userName: string;
  totalCountMessages: number;
};

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 15px',
  backgroundColor: '#bfbaba',
  borderRadius: '5px 5px 0 0'
}));

const Header = ({ userName, totalCountMessages }: OwnProps) => {

  const isXl = useMediaQuery('(min-width: 1700px)');
  const isLg = useMediaQuery('(min-width: 1400px)');
  const isMd = useMediaQuery('(min-width: 900px)');
  const isSm = useMediaQuery('(min-width: 600px)');

  // const colsNum = (
  //   isXl && 4
  //   || isLg && 3
  //   || isMd && 2
  //   || isSm && 1
  // );

  return (
    <Container>
      <NavLink 
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
        to={dialogsPath}
      >
        <Box
          children={isSm ? <CloseIcon /> : <ArrowBackIcon />}
        />
      </NavLink>
      <Box>
        <Typography>
          Диалог с {userName}
        </Typography>
        <Typography>
          Всего сообщений: {totalCountMessages}
        </Typography>
      </Box>
    </Container>
  )
};

export default React.memo(Header)