import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Button,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { dialogsAPI } from 'store/api/dialogs';
import { setDialog } from 'store/slices/dialogs';
import paths from 'routing/paths';

const dialogsPath = paths.dialogs;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.secondary.main,
  margin: '3px',
  borderRadius: '35px',
  padding: '5px'
}))

const Follower = ({ id, name, photo }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const startDialog = useCallback(async () => {
    try {
      const {
        resultCode,
        messages
      } = await dialogsAPI.startDialog(id);

      if (resultCode === 0) {
        dispatch(setDialog);
      } else {
        if (messages) {
          throw new Error(messages)
        } else {
          throw new Error()
        }
      }
    } catch (error) {
      enqueueSnackbar(
        `Возникла ошибка при попытке установить диалог ${error ? error : ''}`,
        { variant: 'error' }
      );
    }
  }, []);

  return (
    <Container>
      <Avatar
        sx={{ width: 55, height: 55 }}
        alt={name.toUpperCase()}
        src={photo ? photo : "dummy.js"}
      />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 2
      }}>
        <Typography
          sx={{
            display: 'block',
            pl: 1,
            maxWidth: '110px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          component='span'
        >
          {name}
        </Typography>
        <NavLink 
          to={dialogsPath + id} 
          onClick={startDialog}
        >
          Написать
        </NavLink>
      </Box>
    </Container>
  );
};

export default React.memo(Follower);