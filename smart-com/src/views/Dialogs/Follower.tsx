import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography
} from '@mui/material';

const Follower = ({ dialog }) => {

  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push(`${id}`);
  }, [history]);

  const {
    id,
    userName,
    hasNewMessages,
    lastDialogActivityDate,
    lastUserActivityDate,
    newMessagesCount,
    photos: {
      small: photo
    }
  } = dialog;

  return (
    <Box
      sx={{
        border: '1px solid black',
        mb: 1
      }}
      key={id}
      onClick={handleClick}
    >
      <img src={photo} alt={userName} />
      <Typography>Имя: {userName}</Typography>
      <Typography>
        {hasNewMessages ? 'Есть новые сообщения' : 'Нет новых сообщений'}
      </Typography>
      <Typography>
        Последняя дата активности диалога: {lastDialogActivityDate}
      </Typography>
      <Typography>
        Последняя дата активности пользователя: {lastUserActivityDate}
      </Typography>
      <Typography>
        Количество новых сообщений: {newMessagesCount}
      </Typography>
    </Box>
  )
};

export default React.memo(Follower);