import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography
} from '@mui/material';
import { dialogsSelector } from 'store/selectors/dialogs';
import Follower from './Follower';

const Followers = () => {

  
  const dialogs = useSelector(dialogsSelector);

  const dialogsToRender = useMemo(() => (
    dialogs?.map((dialog) => (
      <Follower dialog={dialog} key={dialog.id} />
    ))
  ), [dialogs?.length]);

  return (
    <Box>
      {dialogsToRender}
    </Box>
  )
};

export default React.memo(Followers)