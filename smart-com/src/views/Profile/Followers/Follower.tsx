import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { getUserByIdSelector } from 'store/selectors/users';

const Follower = ({ id }) => {

  const {
    name,
    photos: {
      small: userPhoto
    }
  } = useSelector(getUserByIdSelector(id));

  return (
    <Tooltip title={name}>
      <Avatar alt={`photo of ${name}`} src={userPhoto} />
    </Tooltip>
  );
};

export default React.memo(Follower);