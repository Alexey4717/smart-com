import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import View from 'components/View';
import {
  Alert,
  Box,
  Typography
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/system';
import {
  errorsSelector,
  statusSelector
} from 'store/selectors/dialogs';
import { DataLoadingStates } from 'types/utility';
import Loader from 'components/Loader';
import { getAllDialogs } from 'store/slices/dialogs';
import { usersAPI } from 'store/api/users';
import Followers from './Followers';
import Dialog from './Dialog';

const { LOADING, ERROR } = DataLoadingStates;

const Dialogs = () => {

  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const urlLevelList = useHistory().location.pathname.split('/');
  const uriId = urlLevelList[urlLevelList.length - 1];
  const isUriId = Boolean(uriId) && uriId !== 'dialogs';

  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);

  const isLoading = loadingStatus === LOADING;

  useEffect(() => {
    dispatch(getAllDialogs());
  }, [dispatch]);

  const subTitle = useMemo(() => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>
        <Typography color="textSecondary">
          С вашими подписчиками
        </Typography>
      </Box>
    </Box>
  ), []);

  return (
    <View
      pageTitle="Сообщения"
      pageSubTitle={subTitle}
    >
      {isLoading ? <Loader /> : (
        <Box sx={{ display: 'flex' }}>
          <Followers />
          {isUriId && <Dialog userId={uriId} />}
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
}

export default Dialogs;