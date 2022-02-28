import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByIdSelector } from 'store/selectors/users';
import { followUser, unfollowUser } from 'store/slices/users';
import Avatar from '@mui/material/Avatar';

interface OwnProps {
  id: string
};

const User = ({ id }: OwnProps) => {
  const dispatch = useDispatch();
  const {
    name,
    status,
    followed,
    photos: {
      large: userPhoto
    }
  } = useSelector(getUserByIdSelector(id));

  const handleFollowUser = useCallback(() => {
    dispatch(followUser({ userId: id }))
  }, [dispatch]);

  const handleUnfollowUser = useCallback(() => {
    dispatch(unfollowUser({ userId: id }))
  }, [dispatch]);

  return (
    <div>
      <Avatar
        sx={{ width: 200, height: 200 }}
        src={userPhoto ? userPhoto : "/broken-image.jpg"}
        alt={`photo of ${name}`}
      />
      <div>name: {name}</div>
      <div>status: {status}</div>
      <div>{followed ? 'В друзьях' : 'Не в друзьях'}</div>
      <button onClick={followed ? handleUnfollowUser : handleFollowUser}>
        {followed ? 'Отписатсья': 'Подписаться'}
      </button>
    </div>
  );
};

export default React.memo(User);