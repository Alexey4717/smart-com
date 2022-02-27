import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import View from 'components/View';
import {
  Alert,
  Box,
  Typography,
  Pagination
} from '@mui/material';
import { useTheme } from '@mui/system';
import {
  errorsSelector,
  statusSelector,
  usersIdsSelector,
  totalUsersCountSelector,
  currentPageSelector,
  pageSizeSelector
} from 'store/selectors/users';
import { DataLoadingStates } from 'types/utility';
import UsersData from './UsersData';
import Loader from 'components/Loader';
import { getUsersData, setCurrentPage } from 'store/slices/users';
import { authUserIdSelector } from 'store/selectors/auth';

const { LOADING, ERROR } = DataLoadingStates;

const Users = () => {
  const { palette } = useTheme();

  const users = useSelector(usersIdsSelector);
  const totalUsersCount = useSelector(totalUsersCountSelector);
  const currentPage = useSelector(currentPageSelector);
  const pageSize = useSelector(pageSizeSelector);
  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const isLoading = loadingStatus === LOADING;

  const count = Math.ceil(totalUsersCount / pageSize);

  const dispatch = useDispatch();
  const authUserId = useSelector(authUserIdSelector);

  useEffect(() => {
    dispatch(getUsersData(1));
  }, [dispatch]);

  const handleChangeCurrentPage = useCallback((
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
    dispatch(getUsersData(value))
  }, [dispatch]);

  const subTitle = useMemo(() => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>
        <Typography color="textSecondary">
          Зарегистрированные в социальной сети
        </Typography>
      </Box>
    </Box>
  ), []);

  return (
    <View
      pageTitle="Пользователи"
      pageSubTitle={subTitle}
      isLoading={isLoading}
      search={{
        query: '',
        placeholder: 'Поиск пользователей',
        onSubmit: () => console.log('submit')
      }}
    >
      <Pagination
        count={count}
        page={currentPage}
        onChange={handleChangeCurrentPage}
        siblingCount={5}
        shape="rounded"
        showFirstButton
        showLastButton
      />
      {isLoading ? <Loader /> : users && <UsersData />}
      {(loadingStatus === ERROR) && (
        <Alert severity="error">
          <Typography>
            Возникла ошибка при загрузке пользователей
            {errors && `: ${errors}`}
          </Typography>
        </Alert>
      )}
    </View>
  )
};

export default Users;