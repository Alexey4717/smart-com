import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import View from 'components/View';
import {
  Alert,
  Box,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/system';
import {
  errorsSelector,
  statusSelector,
  profileSelector
} from 'store/selectors/profile';
import { DataLoadingStates } from 'types/utility';
import Loader from 'components/Loader';
import { getProfileById } from 'store/slices/profile';
import { authUserIdSelector } from 'store/selectors/auth';
import Dialog from './Dialog';

const { LOADING, ERROR } = DataLoadingStates;

const Dialogs = () => {
  const { palette } = useTheme();

  // Создать слайс и селектор для Dialogs
  const profile = useSelector(profileSelector);
  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const isLoading = loadingStatus === LOADING;

  const dispatch = useDispatch();
  const authUserId = useSelector(authUserIdSelector);

  useEffect(() => {
    dispatch(getProfileById(authUserId));
  }, [dispatch, authUserId]);

  const subTitle = useMemo(() => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>
        <Typography color="textSecondary">
          от других пользователей
        </Typography>
      </Box>
    </Box>
  ), []);

  return (
    <View
      pageTitle="Сообщения"
      pageSubTitle={subTitle}
      isLoading={isLoading}
    >
      {isLoading ? <Loader /> : profile && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Dialog />
        </Box>
      )}
      {(loadingStatus === ERROR) && (
        <Alert severity="error">
          <Typography>
            Возникла ошибка при загрузке сообщений
            {errors && `: ${errors}`}
          </Typography>
        </Alert>
      )}
    </View>
  )
};

export default Dialogs;