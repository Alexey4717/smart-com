import React from "react";
import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledProps {
  isMyMessage?: boolean
};

const MessageBody = styled('div')<StyledProps>(({ isMyMessage = false }) => ({
  position: "relative",
  padding: "10px 10px 0 10px",
  backgroundColor: isMyMessage ? "#A8DDFD" : "#f8e896",
  width: "250px",
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

const MessageTimeStamp = styled('div')<StyledProps>(({ isMyMessage }) => ({
  marginTop: "10px",
  textAlign: isMyMessage ? 'left' : 'right',
  fontStyle: 'italic'
}));

interface OwnProps extends StyledProps {
  message: string,
  timestamp: string,
  photoURL: string,
  displayName: string,
};

const Message = ({
  message,
  timestamp,
  photoURL,
  displayName,
  isMyMessage = false
}: OwnProps) => {

  return (
    <Box sx={{ 
      display: 'flex', 
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      my: 1
    }}>
      <Avatar
        sx={{ order: isMyMessage ? 1 : 0 }}
        alt={displayName.toUpperCase()}
        src={photoURL ? photoURL : "dummy.js"}
      />
      <Box sx={{ 
        order: isMyMessage ? 0 : 1,
        mr: isMyMessage && 3,
        ml: !isMyMessage && 3
      }}>
        <Typography
          sx={{ textAlign: isMyMessage ? 'right' : 'left' }}
          component='p'
        >
          {displayName ? displayName : "безымянный человек"}
        </Typography>
        <MessageBody isMyMessage={isMyMessage}>
          <Typography component="p">
            {message ? message : "no message"}
          </Typography>
          <MessageTimeStamp isMyMessage={isMyMessage}>
            {timestamp ? timestamp : ""}
          </MessageTimeStamp>
        </MessageBody>
      </Box>
    </Box>
  );
};

export default React.memo(Message);