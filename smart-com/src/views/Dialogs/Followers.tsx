import React, { useMemo } from 'react';
import Follower from './Follower';
import { FollowersContainer } from './styles';

interface OwnProps {
  dialogs: string[];
  isMd: boolean;
  isUriId: boolean;
};

const Followers = ({ dialogs, isMd, isUriId }: OwnProps) => {

  const dialogsToRender = useMemo(() => (
    dialogs?.map((dialogId) => (
      <Follower dialogId={dialogId} key={dialogId} />
    ))
  ), [dialogs?.length]);

  return (
    <FollowersContainer isMd={isMd} isUriId={isUriId}>
      {dialogsToRender}
    </FollowersContainer>
  )
};

export default React.memo(Followers);