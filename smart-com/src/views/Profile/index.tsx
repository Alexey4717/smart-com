import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

const { LOADING, ERROR } = DataLoadingStates;

const Profile = () => {
  const { palette } = useTheme();

  const urlLevelList = useHistory().location.pathname.split('/');
  const uriId = urlLevelList[urlLevelList.length - 1];
  const isUriId = (Boolean(uriId) && uriId !== 'profile') ? true : false;

  const [isEditMode, setIsEditMode] = useState(false);

  const profile = useSelector(profileSelector);
  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const isLoading = loadingStatus === LOADING;

  const toggleEditMode = useCallback(() => {
    setIsEditMode(editMode => !editMode)
  }, [setIsEditMode]);

  const dispatch = useDispatch();
  const authUserId = useSelector(authUserIdSelector);

  const isAuthUser = Boolean(authUserId === Number(uriId) || !isUriId);

  console.log('isAuthUser', isAuthUser)

  useEffect(() => {
    if (!isUriId) {
      dispatch(getProfileById(authUserId));
    } else {
      dispatch(getProfileById(Number(uriId)));
    }
  }, [dispatch, authUserId]);


  const subTitle = useMemo(() => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>
        <Typography color="textSecondary">
          {isAuthUser ? 'Вашего аккаунта' : 'Чужого аккаунта'}
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
  ), [isEditMode, palette.text.secondary, toggleEditMode]);

  return (
    <View
      pageTitle="Профиль"
      pageSubTitle={subTitle}
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