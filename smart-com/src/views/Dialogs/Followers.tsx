import React, { useMemo } from 'react';
import type { Dialog } from 'types/dialogs';
import Follower from './Follower';
import { FollowersContainer } from './styles';

interface OwnProps {
  dialogs: Dialog[];
  isMd: boolean;
  isUriId: boolean;
};

const Followers = ({ dialogs, isMd, isUriId }: OwnProps) => {

  const dialogsToRender = useMemo(() => (
    dialogs?.map((dialog) => (
      <Follower dialog={dialog} key={dialog.id} />
    ))
  ), [dialogs?.length]);

  return (
    <FollowersContainer isMd={isMd} isUriId={isUriId}>
      {dialogsToRender}
    </FollowersContainer>
  )
};

export default React.memo(Followers);