import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Badge
} from '@mui/material';
import { dateConverter } from 'utils/dateConverter';
import useIdFromHistory from 'hooks/useIdFromHistory';
import { getDialogByIdSelector } from 'store/selectors/dialogs';
import { FollowerContainer, ActivityDate } from './styles';

interface OwnProps {
  dialogId: string;
};

const Follower = ({ dialogId }: OwnProps) => {
  const history = useHistory();
  const dialog = useSelector(getDialogByIdSelector(dialogId))

  const { uriId } = useIdFromHistory();

  const handleClick = useCallback(() => {
    history.push(`${dialogId}`);
  }, [history]);

  const {
    userName,
    hasNewMessages,
    lastDialogActivityDate,
    lastUserActivityDate,
    newMessagesCount,
    photos: {
      small: photo
    }
  } = dialog;

  const isDialogActive = uriId === dialogId;
  const activityDateDialog = dateConverter(lastDialogActivityDate);
  const activityDateUser = dateConverter(lastUserActivityDate);

  return (
    <Badge
      badgeContent={newMessagesCount}
      color="success"
      component="div"
      sx={{
        marginBottom: 1,
        '&:nth-last-of-type(1)': {
          marginBottom: 0
        }
      }}
    >
      <FollowerContainer
        hasNewMessages={hasNewMessages}
        onClick={handleClick}
        isActive={isDialogActive}
      >
        <Avatar
          sx={{ width: 55, height: 55, mr: 1 }}
          alt={userName.toUpperCase()}
          src={photo ? photo : "dummy.js"}
        />
        <Box>
          <Typography>{userName}</Typography>
          <ActivityDate>
            Диалог был активен: {activityDateDialog}
          </ActivityDate>
          <ActivityDate>
            Пользователь был активен: {activityDateUser}
          </ActivityDate>
        </Box>
      </FollowerContainer>
    </Badge>
  )
};

export default React.memo(Follower);