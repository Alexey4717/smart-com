import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { getUserByIdSelector } from 'store/selectors/users';

const Follower = ({ id }) => {

  const {
    name,
    photos: {
      small: userPhoto
    }
  } = useSelector(getUserByIdSelector(id));

  return (
    <>
      <Avatar alt={`photo of ${name}`} src={userPhoto} />
      <div>{name}</div>
      <div>Написать сообщение</div>
    </>
  );
};

export default React.memo(Follower);