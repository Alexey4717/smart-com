import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { usersIdsSelector } from 'store/selectors/users';
import ImageList from '@mui/material/ImageList';
import User from './User';

const UsersData = () => {
  const usersIds: string[] = useSelector(usersIdsSelector);

  const usersToRender = useMemo(() => (
    usersIds.map(id => (
      <User id={id} key={id} />
    ))
  ), [usersIds.length]);

  return (
    <ImageList 
      sx={{ width: '100%', height: '100%' }}
      cols={4} 
      gap={20}
    >
      {usersToRender}
    </ImageList>
  )
};

export default React.memo(UsersData);