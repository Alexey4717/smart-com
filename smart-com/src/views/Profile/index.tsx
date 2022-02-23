import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import View from 'components/View';
import {
  Alert,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/system';
import {
  errorsSelector,
  statusSelector,
  profileSelector
} from 'store/selectors/profile';
import { authUserIdSelector } from 'store/selectors/auth';
import { getProfileById } from 'store/slices/profile';
import { DataLoadingStates } from 'types/utility';
import Service from './Service';
import ProfileData from './ProfileData';
import ProfileEditor from './ProfileEditor';
import Loader from 'components/Loader';

const { LOADING, ERROR } = DataLoadingStates;

const Profile = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);

  const authUserId = useSelector(authUserIdSelector);
  const profile = useSelector(profileSelector);
  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const isLoading = loadingStatus === LOADING;

  const toggleEditMode = useCallback(() => {
    setIsEditMode(editMode => !editMode)
  }, [setIsEditMode]);


  useEffect(() => {
    dispatch(getProfileById(authUserId))
  }, [dispatch]);

  const subTitle = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>
        <Typography color="textSecondary">
          Вашего аккаунта
        </Typography>
      </Box>
      {isEditMode}
      <Button variant="text" onClick={toggleEditMode}>
        {isEditMode
          ? <FactCheckIcon
            sx={{ display: 'block' }}
            color={palette.text.secondary}
          />
          : <ManageAccountsIcon
            sx={{ display: 'block' }}
            color={palette.text.secondary}
          />}
        <Typography color="textSecondary">
          {isEditMode ? 'Завершить редактирование' : 'Редактировать'}
        </Typography>
      </Button>
      <AdminPanelSettingsIcon />
    </Box>
  );

  return (
    <View
      pageTitle="Профиль"
      pageSubTitle={subTitle}
      isLoading={isLoading}
    >
      {isLoading ? <Loader /> : profile && (
        <>
          {isEditMode ? <ProfileEditor /> : <ProfileData />}
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