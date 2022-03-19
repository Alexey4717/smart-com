import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { usersIdsSelector } from 'store/selectors/users';
import ImageList from '@mui/material/ImageList';
import useMediaQuery from 'hooks/useMediaQuery';
import User from './User';

const UsersData = () => {
  const usersIds: string[] = useSelector(usersIdsSelector);

  const isXl = useMediaQuery('(min-width: 1700px)');
  const isLg = useMediaQuery('(min-width: 1400px)');
  const isMd = useMediaQuery('(min-width: 900px)');
  const isSm = useMediaQuery('(min-width: 600px)');

  const colsNum = (
    isXl && 4
    || isLg && 3
    || isMd && 2
    || isSm && 1
  );

  const usersToRender = useMemo(() => (
    usersIds.map(id => (
      <User id={id} key={id} />
    ))
  ), [usersIds]);

  return (
    <ImageList 
      sx={{ width: '100%', height: '100%', py: 3 }}
      cols={colsNum} 
      gap={20}
    >
      {usersToRender}
    </ImageList>
  )
};

export default React.memo(UsersData);