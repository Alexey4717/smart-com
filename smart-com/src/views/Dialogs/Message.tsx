import React from 'react';
import { useSelector } from 'react-redux';
import DialogMessage from 'components/Message';
import { authUserIdSelector } from 'store/selectors/auth';
import { getmessageByIdSelector } from 'store/selectors/dialogs';

interface OwnProps { 
  messageId: string;
};

const Message = ({ messageId }: OwnProps) => {

  const authUserId = useSelector(authUserIdSelector);
  const message = useSelector(getmessageByIdSelector(messageId));
  const {
    body,
    senderId,
    senderName,
    viewed,
    addedAt
  } = message;

  const isMyMessage = authUserId === senderId;

  return (
    <DialogMessage
      id={messageId}
      message={body}
      userName={senderName}
      isMyMessage={isMyMessage}
      viewed={viewed}
      addedDate={addedAt}
    />
  )
};

export default React.memo(Message);