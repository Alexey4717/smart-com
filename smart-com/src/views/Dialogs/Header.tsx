import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from 'hooks/useMediaQuery';
import paths from 'routing/paths';
import { HeaderContainer } from './styles';

const dialogsPath = paths.dialogs;

interface OwnProps {
  userName: number;
  totalCountMessages: number;
};

const Header = ({ userName, totalCountMessages }: OwnProps) => {

  const isSm = useMediaQuery('(min-width: 600px)');

  return (
    <HeaderContainer>
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
    </HeaderContainer>
  )
};

export default React.memo(Header)