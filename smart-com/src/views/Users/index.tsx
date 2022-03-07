import { useEffect, useState, useCallback, useMemo } from 'react';
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
  usersIdsSelector,
  totalUsersCountSelector,
  currentPageSelector,
  pageSizeSelector
} from 'store/selectors/users';
import { DataLoadingStates } from 'types/utility';
import UsersData from './UsersData';
import Loader from 'components/Loader';
import { getUsersData, setCurrentPage } from 'store/slices/users';

const { LOADING, ERROR } = DataLoadingStates;

const Users = () => {

  const users = useSelector(usersIdsSelector);
  const totalUsersCount = useSelector(totalUsersCountSelector);
  const currentPage = useSelector(currentPageSelector);
  const pageSize = useSelector(pageSizeSelector);
  const errors = useSelector(errorsSelector);
  const loadingStatus = useSelector(statusSelector);
  const isLoading = loadingStatus === LOADING;

  const count = Math.ceil(totalUsersCount / pageSize);

  const dispatch = useDispatch();

  const [term, setTerm] = useState<string>('');

  useEffect(() => {
    dispatch(getUsersData({currentPage: 1, pageSize, term, friend: null}));
  }, [dispatch, pageSize, term]);

  const handleChangeCurrentPage = useCallback((
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
    dispatch(getUsersData({ currentPage: value, pageSize, term, friend: null }));
  }, [dispatch, pageSize, term]);

  const handleSearch = useCallback(
    (term: string) => {
      setTerm(term);
      dispatch(getUsersData({ currentPage: 1, pageSize, term, friend: null }));
    },
    [dispatch, setTerm, pageSize]
  );

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
      search={{
        query: term,
        placeholder: 'Поиск пользователей',
        onSubmit: handleSearch
      }}
      pagination={{
        count,
        currentPage,
        handleChange: handleChangeCurrentPage
      }}
    >
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