import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersIdsSelector } from 'store/selectors/users';
import User from './User';

type gg = {
  id: string
}

const UsersData = () => {
  //const dispatch = useDispatch();
  const usersIds: string[] = useSelector(usersIdsSelector);

  const usersToRender = useMemo(() => (
    usersIds.map(id => (
      <User id={id} key={id} />
    ))
  ), [usersIds.length]);

  return (
    <div>{usersToRender}</div>
  )
};

export default React.memo(UsersData);