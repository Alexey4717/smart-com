import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';
import TextInput from "./TextInput";
import Message from "./Message";
import {
  messagesIdsSelector,
  totalCountSelector
} from 'store/selectors/dialogs';
import { setMessages, setTotalCount } from 'store/slices/dialogs';
import { dialogsAPI } from 'store/api/dialogs';
import Header from './Header';
import { DialogContainer } from './styles';

interface OwnProps {
  userId: number
};

const Dialog = ({ userId }: OwnProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const messages = useSelector(messagesIdsSelector);
  const totalCount = useSelector(totalCountSelector);

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
          dispatch(setMessages(items));
          dispatch(setTotalCount(totalCount))
        } else if (error) {
          throw new Error(error);
        } else {
          throw new Error();
        }

      } catch (error) {
        enqueueSnackbar(
          `An error occurred while loading messages: ${error}`,
          { variant: 'error' }
        );
      }
    }
    getMessages()
  }, []);

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView()
    }
  }, [messages])

  const messagesToRender = useMemo(() => (
    messages?.map((messageId) => {
      return (
        <Message messageId={messageId} />
      )
    })
  ), [messages?.length]);

  return (
    <DialogContainer onScroll={scrollHandler}>
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
            : <Typography sx={{ m: 'auto' }}>
              No messages
            </Typography>
        }
        <div ref={messagesAnchorRef} />
      </Box>
      <TextInput userId={userId} />
    </DialogContainer>
  );
};

export default React.memo(Dialog);