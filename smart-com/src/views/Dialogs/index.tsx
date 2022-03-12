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
  statusSelector,
  dialogsSelector
} from 'store/selectors/dialogs';
import { DataLoadingStates } from 'types/utility';
import Loader from 'components/Loader';
import { getAllDialogs } from 'store/slices/dialogs';
import { usersAPI } from 'store/api/users';
import Followers from './Followers';
import Dialog from './Dialog';
import useIdFromHistory from 'hooks/useIdFromHistory';

const { LOADING, ERROR } = DataLoadingStates;

const Dialogs = () => {

  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { isUriId, uriId } = useIdFromHistory();

  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const dialogs = useSelector(dialogsSelector);

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
      pageTitle="Переписка"
      pageSubTitle={subTitle}
    >
      {isLoading ? <Loader /> : dialogs && (
        <Box 
          sx={{ 
            display: 'flex', 
            height: '500px', 
            overflow: 'hidden'
          }}
        >
          <Followers dialogs={dialogs} />
          {
            isUriId
              ? <Dialog
                userId={uriId}
              //yourPhoto={dialogs.photos.small} 
              //recipientPhoto={dialogs.photos.small} 
              />
              : <Typography
                sx={{ m: 'auto' }}
              >
                Для вывода сообщений нажмите на соответствующий диалог
              </Typography>
          }
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