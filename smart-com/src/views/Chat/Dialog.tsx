import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from 'react-redux';
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextInput from "./TextInput";
import Message from "components/Message";
import { messagesSelector } from 'store/selectors/chat';
import { authUserIdSelector } from 'store/selectors/auth';
import type { Message as TypeMessage } from 'types/chat'

const Container = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-between',
  width: "500px",
  height: "500px",
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'calc(100vh - 300px)'
  },
}));


const Dialog = () => {
  const messages: TypeMessage[] = useSelector(messagesSelector);
  const authUserId = useSelector(authUserIdSelector);

  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])


  const messagesToRender = useMemo(() => (
    messages.map(({
      id,
      userId,
      userName,
      message,
      photo
    }) => {
      const isMyMessage = authUserId === userId;
      return (
        <Message
          message={message}
          photo={photo}
          userName={userName}
          key={id}
          isMyMessage={isMyMessage}
        />
      )
    })
  ), [messages.length]);

  return (
    <Container onScroll={scrollHandler}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        height: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar-thumb': {
          border: `5px solid white`
        }
      }}>
        {messagesToRender}
        <div ref={messagesAnchorRef}></div>
      </Box>
      <TextInput />
    </Container>
  );
};

export default React.memo(Dialog);