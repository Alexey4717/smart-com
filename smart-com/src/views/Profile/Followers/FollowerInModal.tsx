import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box } from '@mui/material';
import { getUserByIdSelector } from 'store/selectors/users';

const FollowerInModal = ({ id }) => {

  const {
    name,
    status,
    photos: {
      large: userPhoto
    }
  } = useSelector(getUserByIdSelector(id));

  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar alt={`photo of ${name}`} src={userPhoto} />
      <div>
        <p>{name}</p>
        <p>{status}</p>
      </div>

    </Box>
  );
};

export default React.memo(FollowerInModal);