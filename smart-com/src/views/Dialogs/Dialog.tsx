import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextInput from "./TextInput";
import Message from "components/Message";
import { messagesSelector } from 'store/selectors/dialogs';
import { authUserIdSelector } from 'store/selectors/auth';
import type { Message as TypeMessage } from 'types/chat';
import { setMessages } from 'store/slices/dialogs';
import { dialogsAPI } from 'store/api/dialogs';
import Header from './Header';

const Container = styled(Paper)({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: 'space-between',
  height: "500px",
  boxShadow: 'none'
});

const Dialog = ({ userId }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { items: messages, totalCount } = useSelector(messagesSelector);

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
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { items, totalCount, error } = await dialogsAPI.getMessages(userId);

        if (items && totalCount !== undefined) {
          dispatch(setMessages({ items, totalCount }));
        } else if (error) {
          throw new Error(error);
        } else {
          throw new Error();
        }

      } catch (error) {
        enqueueSnackbar(
          `Возникла ошибка в процессе загрузки сообщений: ${error}`,
          { variant: 'error' }
        );
      }
    }
    getMessages()
  }, []);

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const messagesToRender = useMemo(() => (
    messages?.map(({
      addedAt,
      body,
      id,
      senderId,
      senderName,
      viewed
    }) => {
      const isMyMessage = authUserId === senderId;
      return (
        <Message
          id={id}
          message={body}
          userName={senderName}
          key={id}
          isMyMessage={isMyMessage}
          viewed={viewed}
          addedDate={addedAt}
        />
      )
    })
  ), [messages?.length]);

  return (
    <Container onScroll={scrollHandler}>
      <Header 
        userName={userId}
        totalCountMessages={totalCount}
      />
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
        {
          messages?.length
            ? messagesToRender
            : <Typography sx={{ m: 'auto' }}>Нет сообщений</Typography>
        }
        <div ref={messagesAnchorRef}></div>
      </Box>
      <TextInput userId={userId} />
    </Container>
  );
};

export default React.memo(Dialog);