import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import type { Dialog } from 'types/dialogs';
import Follower from './Follower';

interface OwnProps {
  dialogs: Dialog[];
  isSm: boolean;
  isUriId: boolean;
};

const Followers = ({ dialogs, isSm, isUriId }: OwnProps) => {

  const dialogsToRender = useMemo(() => (
    dialogs?.map((dialog) => (
      <Follower dialog={dialog} key={dialog.id} />
    ))
  ), [dialogs?.length]);

  return (
    <Box sx={{
      display: !isSm && isUriId ? 'none' : 'flex',
      flexDirection: 'column',
      flexBasis: '400px',
      overflowY: 'scroll',
      pr: 2,
      mr: 1
    }}>
      {dialogsToRender}
    </Box>
  )
};

export default React.memo(Followers)