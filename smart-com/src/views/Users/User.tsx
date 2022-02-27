import React from 'react';
import { useSelector } from 'react-redux';
import { getUserByIdSelector } from 'store/selectors/users';
import Avatar from '@mui/material/Avatar';

interface OwnProps {
  id: string
};

const User = ({ id }: OwnProps) => {
  const {
    name,
    status,
    followed,
    photos: {
      large: userPhoto
    }
  } = useSelector(getUserByIdSelector(id))

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
    </div>
  );
};

export default React.memo(User);