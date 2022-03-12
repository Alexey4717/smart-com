import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Avatar,
  Badge
} from '@mui/material';
import { dateConverter } from 'utils/dateConverter';
import useIdFromHistory from 'hooks/useIdFromHistory';

interface StyledProps {
  hasNewMessages: boolean;
  isActive: boolean;
};

const Container = styled(Box)<StyledProps>(({ theme, hasNewMessages, isActive = false }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `2px solid ${isActive ? theme.palette.primary.main : 'none'}`,
  borderRadius: 15,
  padding: 8,
  cursor: 'pointer',
  width: '100%',
  backgroundColor: hasNewMessages ? '#CCFF99' : 'white'
}));

const ActivityDate = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary
}));

const Follower = ({ dialog }) => {
  const { palette } = useTheme();
  const history = useHistory();

  const { uriId } = useIdFromHistory();

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

  const isDialogActive = uriId === id.toString();
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
      <Container
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
      </Container>
    </Badge>
  )
};

export default React.memo(Follower);