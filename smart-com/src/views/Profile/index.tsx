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
  profileSelector
} from 'store/selectors/profile';
import { DataLoadingStates } from 'types/utility';
import ProfileData from './ProfileData';
import ProfileEditor from './ProfileEditor';
import Loader from 'components/Loader';
import { getProfileById } from 'store/slices/profile';
import { authUserIdSelector } from 'store/selectors/auth';
import { usersAPI } from 'store/api/users';
import useIdFromHistory from 'hooks/useIdFromHistory';

const { LOADING, ERROR } = DataLoadingStates;

const Profile = () => {
  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { isUriId, uriId } = useIdFromHistory();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isFollowUser, setIsFollowUser] = useState<boolean>(false);

  const profile = useSelector(profileSelector);
  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const authUserId = useSelector(authUserIdSelector);

  const isAuthUser = Boolean(authUserId === Number(uriId) || !isUriId);
  const isLoading = loadingStatus === LOADING;

  const toggleEditMode = useCallback(() => {
    setIsEditMode(editMode => !editMode)
  }, [setIsEditMode]);

  useEffect(() => {
    if (!isUriId) {
      dispatch(getProfileById(authUserId));
    } else {
      dispatch(getProfileById(Number(uriId)));
    }
  }, [dispatch, authUserId]);

  useEffect(() => {
    const getFollowToUserInfo = async () => {
      if (isUriId) {
        try {
          const response = await usersAPI.isFollow(Number(uriId));
          setIsFollowUser(response);
        } catch (error) {
          enqueueSnackbar(
            `Возникла ошибка при определении подписки пользователя${error ? `: ${error}` : ''}.`,
            { variant: 'error' }
          );
        }
      };
    }
    getFollowToUserInfo();
  }, []);

  const subTitle = useMemo(() => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>
        <Typography color="textSecondary">
          {
            isAuthUser
              ? 'Вашего аккаунта'
              : (
                isFollowUser
                  ? 'Вашего подписчика'
                  : 'Чужого аккаунта'
              )
          }
        </Typography>
      </Box>
      {isAuthUser && (
        <Button variant="text" onClick={toggleEditMode}>
          {isEditMode
            ? <HighlightOffIcon
              sx={{ display: 'block' }}
              color={palette.text.secondary}
            />
            : <ManageAccountsIcon
              sx={{ display: 'block' }}
              color={palette.text.secondary}
            />}
          <Typography color="textSecondary">
            {isEditMode ? 'Отменить редактирование' : 'Редактировать'}
          </Typography>
        </Button>
      )}
    </Box>
  ), [isEditMode, isFollowUser, palette.text.secondary, toggleEditMode]);

  return (
    <View
      pageTitle="Профиль"
      pageSubTitle={subTitle}
      isLoading={isLoading}
    >
      {isLoading ? <Loader /> : profile && (
        <>
          {isEditMode
            ? <ProfileEditor setIsEditMode={setIsEditMode} />
            : <ProfileData isAuthUser={isAuthUser} />}
        </>
      )}
      {(loadingStatus === ERROR) && (
        <Alert severity="error">
          <Typography>
            Возникла ошибка при загрузке профиля
            {errors && `: ${errors}`}
          </Typography>
        </Alert>
      )}
    </View>
  )
};

export default Profile;