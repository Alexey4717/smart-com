import React, { useState, useCallback } from "react";
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import RestoreIcon from '@mui/icons-material/Restore';
import { useTheme } from '@mui/system';
import type { Message as TypeMessage } from 'types/chat';
import { dateConverter } from 'utils/dateConverter';
import { dialogsAPI } from 'store/api/dialogs';

type StyledProps = Pick<TypeMessage, 'isMyMessage'>;

const MessageBody = styled('div')<StyledProps>(({ isMyMessage = false }) => ({
  position: "relative",
  padding: "5px 10px",
  backgroundColor: isMyMessage ? "#A8DDFD" : "#f8e896",
  border: `1px solid ${isMyMessage ? '#97C6E3' : '#dfd087'}`,
  borderRadius: '10px',
  "&:after": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: `15px solid ${isMyMessage ? "#A8DDFD" : "#f8e896"}`,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: "0",
    left: !isMyMessage && "-15px",
    right: isMyMessage && "-15px"
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: `17px solid ${isMyMessage ? '#97C6E3' : '#dfd087'}`,
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    left: !isMyMessage && "-17px",
    right: isMyMessage && "-17px"
  }
}))

const Message = ({
  id,
  userName,
  message,
  photo,
  isMyMessage = false,
  viewed = true,
  addedDate
}: TypeMessage) => {

  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [
    isDeletedMessage,
    setIsDeletedMessage
  ] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    try {
      const {
        fieldsErrors,
        resultCode
      } = await dialogsAPI.deleteMessage(id);

      if (resultCode === 0) {
        setIsDeletedMessage(true)
        enqueueSnackbar(
          'The message deleted successfully. You can still restore it until you refresh your browser page',
          { variant: 'success' }
        );
      } else if (fieldsErrors) {
        throw new Error(fieldsErrors[0]);
      } else {
        throw new Error();
      }

    } catch (error) {
      enqueueSnackbar(
        `An error occurred while deleting a message: ${error}`,
        { variant: 'error' }
      );
    }
  }, [id, setIsDeletedMessage]);

  const handleRestore = useCallback(async () => {
    try {
      const {
        fieldsErrors,
        resultCode
      } = await dialogsAPI.restoreMessage(id);

      if (resultCode === 0) {
        setIsDeletedMessage(false)
        enqueueSnackbar(
          'Message restored successfully',
          { variant: 'success' }
        );
      } else if (fieldsErrors) {
        throw new Error(fieldsErrors[0]);
      } else {
        throw new Error();
      }

    } catch (error) {
      enqueueSnackbar(
        `An error occurred while restoring a message: ${error}`,
        { variant: 'error' }
      );
    }
  }, [id, setIsDeletedMessage]);

  return (
    <Box sx={{
      display: 'flex',
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      my: 1,
      opacity: isDeletedMessage ? 0.7 : 1.0
    }}>
      {
        !viewed && isMyMessage
        && <CircleIcon
          sx={{
            alignSelf: 'center',
            width: 10,
            height: 10,
            mr: 2,
            opacity: 0.7
          }}
        />
      }
      <Avatar
        sx={{ order: isMyMessage ? 1 : 0 }}
        alt={userName.toUpperCase()}
        src={photo ? photo : "dummy.js"}
      />
      <Box sx={{
        order: isMyMessage ? 0 : 1,
        mr: isMyMessage && 3,
        ml: !isMyMessage && 3
      }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
            alignItems: 'flex-end'
          }}
        >
          {
            id
            && <Tooltip
              title={
                isDeletedMessage
                  ? 'Restore message'
                  : 'Delete message'
              }
            >
              <IconButton
                sx={{
                  cursor: 'pointer',
                  order: isMyMessage ? 1 : 0,
                  '& > *': {
                    width: 15,
                    height: 15
                  }
                }}
                aria-label={isDeletedMessage ? "restore" : "delete"}
                onClick={isDeletedMessage ? handleRestore : handleDelete}
              >
                {isDeletedMessage ? <RestoreIcon /> : <CloseIcon />}
              </IconButton>
            </Tooltip>
          }
          <Typography
            sx={{
              textAlign: isMyMessage ? 'right' : 'left',
              margin: isMyMessage ? '0 5px 0 0' : '0 0 0 5px'
            }}
            component='p'
          >
            {userName ? userName : "nameless person"}
          </Typography>
        </Box>
        <MessageBody isMyMessage={isMyMessage}>
          <Typography component="p">
            {message ? message : "no message"}
          </Typography>
        </MessageBody>
        {
          Boolean(addedDate)
          && <Typography
            sx={{
              color: palette.text.secondary,
              fontSize: 12
            }}
          >
            {dateConverter(addedDate)}
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default React.memo(Message);