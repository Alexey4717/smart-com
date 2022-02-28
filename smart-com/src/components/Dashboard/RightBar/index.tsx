import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { usersIdsSelector } from 'store/selectors/users';
import { getUsersData } from 'store/slices/users';
import Follower from './Follower';

const RightBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersData({
      currentPage: 1,
      pageSize: 100,
      term: '',
      friend: true
    }));

    //поменять на запрос и присваивание данных без диспатча в стор (т.к. будут перезатираться user`ы)
  }, []);

  const userFolowersIds = useSelector(usersIdsSelector);
  const totalFollowersCount = userFolowersIds.length;

  return (
    <>
      <Typography component="span">
        Подписчики ({totalFollowersCount}):
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '500px',
        overflow: 'scroll'
      }}>
        {userFolowersIds.map(id => (
          <Follower id={id} key={id} />
        ))}
      </Box>
    </>
  )
};

export default React.memo(RightBar);