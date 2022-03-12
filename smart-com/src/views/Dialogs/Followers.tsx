import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography
} from '@mui/material';
import Follower from './Follower';

const Followers = ({ dialogs }) => {

  const dialogsToRender = useMemo(() => (
    dialogs?.map((dialog) => (
      <Follower dialog={dialog} key={dialog.id} />
    ))
  ), [dialogs?.length]);

  return (
    <Box sx={{
      display: 'inline-flex',
      flexDirection: 'column',
      overflowY: 'scroll',
      pr: 2,
      mr: 1
    }}>
      {dialogsToRender}
    </Box>
  )
};

export default React.memo(Followers)