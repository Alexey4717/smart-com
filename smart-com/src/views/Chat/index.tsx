import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import View from 'components/View';
import {
  Alert,
  Box,
  Typography
} from '@mui/material';
import {
  errorsSelector,
  statusSelector
} from 'store/selectors/chat';
import { StatusLoadingWs } from 'types/utility';
import Loader from 'components/Loader';
import { getProfileById } from 'store/slices/profile';
import { authUserIdSelector } from 'store/selectors/auth';
import {
  startMessagesListening,
  stopMessagesListening,
  resetMessages
} from 'store/slices/chat';
import Dialog from './Dialog';

const { PENDING, ERROR } = StatusLoadingWs;

const Chat = () => {

  const dispatch = useDispatch();

  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const isPending = loadingStatus === PENDING;
  const authUserId = useSelector(authUserIdSelector);

  useEffect(() => {
    dispatch(getProfileById(authUserId));
  }, [dispatch, authUserId]);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
      dispatch(resetMessages());
    }
  }, [dispatch]);

  const subTitle = useMemo(() => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>
        <Typography color="textSecondary">
          Последние 100 сообщений
        </Typography>
      </Box>
    </Box>
  ), []);

  return (
    <View
      pageTitle="Чат"
      pageSubTitle={subTitle}
    >
      {isPending ? <Loader /> : (
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <Dialog />
        </Box>
      )}
      {(loadingStatus === ERROR) && (
        <Alert severity="error">
          <Typography>
            Возникла ошибка при загрузке чата
            {errors && `: ${errors}`}
          </Typography>
        </Alert>
      )}
    </View>
  )
};

export default Chat;