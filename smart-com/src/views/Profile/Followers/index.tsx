import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Box,
  AvatarGroup,
  Tooltip
} from '@mui/material'
import { usersIdsSelector } from 'store/selectors/users';
import { getUsersData } from 'store/slices/users';
import getWordEnding from 'utils/getWordEnding';
import type { DialogProps } from '@mui/material/Dialog';
import Follower from './Follower';
import FollowersModal from './FollowersModal';

const Followers = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  useEffect(() => {
    dispatch(getUsersData({
      currentPage: 1,
      pageSize: 100,
      term: '',
      friend: true
    }));
  }, []);

  const userFolowersIds = useSelector(usersIdsSelector);
  const totalFollowersCount = userFolowersIds.length;
  const wordEndingForFollower = getWordEnding(totalFollowersCount, ['', 'а', 'ов']);

  return (
    <Box sx={{ padding: 2 }}>
      <Tooltip title="Нажмите для просмотра полного списка подписчиков">
        <Typography
          sx={{
            display: 'inline-block',
            textDecoration: 'underline',
            cursor: 'pointer',
            mb: 2
          }}
          component="span"
          onClick={handleClickOpen('paper')}
        >
          {totalFollowersCount} подписчик{wordEndingForFollower}:
        </Typography>
      </Tooltip>
      <AvatarGroup sx={{ justifyContent: 'flex-end' }} total={totalFollowersCount}>
        {userFolowersIds.map(id => (
          <Follower id={id} key={id} />
        ))}
      </AvatarGroup>
      <FollowersModal
        open={open}
        setOpen={setOpen}
        scroll={scroll}
        userFolowersIds={userFolowersIds}
      />
    </Box>
  )
};

export default React.memo(Followers);