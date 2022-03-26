import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from 'react-redux';
import TextInput from "./TextInput";
import Message from "components/Message";
import { messagesSelector } from 'store/selectors/chat';
import { authUserIdSelector } from 'store/selectors/auth';
import type { Message as TypeMessage } from 'types/chat'
import { Container, Heading, Messages } from './styles';

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
      <Heading>
        Common chat
      </Heading>
      <Messages>
        {messagesToRender}
        <div ref={messagesAnchorRef}></div>
      </Messages>
      <TextInput />
    </Container>
  );
};

export default React.memo(Dialog);