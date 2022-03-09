import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
        history.push(`/dialogs/${id}`);
      } else {
        if (messages) {
          throw new Error(messages)
        } else {
          throw new Error()
        }
      }
    } catch (error) {
      enqueueSnackbar(
        `Возникла ошибка при попытке устанровить диалог ${error ? error : ''}`,
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
        <Button 
          sx={{ fontSize: '10px' }}
          variant="text"
          onClick={startDialog}
        >
          Написать
        </Button>
      </Box>
    </Container>
  );
};

export default React.memo(Follower);