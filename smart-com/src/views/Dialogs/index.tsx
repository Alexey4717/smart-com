import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
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
  dialogsSelector
} from 'store/selectors/dialogs';
import { DataLoadingStates } from 'types/utility';
import Loader from 'components/Loader';
import { getAllDialogs } from 'store/slices/dialogs';
import useIdFromHistory from 'hooks/useIdFromHistory';
import useMediaQuery from 'hooks/useMediaQuery';
import Followers from './Followers';
import Dialog from './Dialog';

const { LOADING, ERROR } = DataLoadingStates;

const Dialogs = () => {

  const dispatch = useDispatch();

  const { isUriId, uriId } = useIdFromHistory();

  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const dialogs = useSelector(dialogsSelector);

  const isLoading = loadingStatus === LOADING;

  const isSm = useMediaQuery('(min-width: 600px)');

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
            overflow: 'hidden',
          }}
        >

          <Followers 
            isUriId={isUriId}
            isSm={isSm}
            dialogs={dialogs} 
          />
          <Box
            sx={{
              display: !isSm && !isUriId && 'none',
              flexBasis: isSm ? 'calc(100% - 400px)' : '100%'
            }}
          >
            {
              isUriId
                ? <Dialog
                  userId={uriId}
                />
                : <Typography
                  sx={{
                    display: !isSm && 'none',
                    m: 'auto'
                  }}
                >
                  Для вывода сообщений нажмите на соответствующий диалог
                </Typography>
            }
          </Box>
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