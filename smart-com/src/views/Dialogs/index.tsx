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
import { DialogsContainer } from './styles';

const { LOADING, ERROR } = DataLoadingStates;

const Dialogs = () => {

  const dispatch = useDispatch();

  const { isUriId, uriId } = useIdFromHistory();

  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const dialogs = useSelector(dialogsSelector);

  const isLoading = loadingStatus === LOADING;

  const isMd = useMediaQuery('(min-width: 900px)');

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
        <DialogsContainer>
          <Followers
            isUriId={isUriId}
            isMd={isMd}
            dialogs={dialogs}
          />
          <Box
            sx={{
              display: !isMd && !isUriId ? 'none' : 'flex',
              flexBasis: isMd ? 'calc(100% - 400px)' : '100%',
            }}
          >
            {
              isUriId
                ? <Dialog
                  userId={uriId}
                />
                : <Typography
                  sx={{
                    display: isMd ? 'block' : 'none',
                    m: 'auto'
                  }}
                >
                  Для вывода сообщений нажмите на соответствующий диалог
                </Typography>
            }
          </Box>
        </DialogsContainer>
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