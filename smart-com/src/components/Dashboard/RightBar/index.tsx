import React, { useEffect, useState } from 'react';
import { usersAPI } from 'store/api/users';
import type { UserType } from 'types/user';
import Follower from './Follower';
import {
  Container,
  Header,
  Box
} from './styles';

const RightBar = () => {
  const [followersData, setFollowersData] = useState<UserType[]>([]);
  const [totalFollowersCount, setTotalFollowersCount] = useState<number>();

  useEffect(() => {
    const getFollowersData = async () => {
      try {
        const {
          items,
          totalCount,
          error
        } = await usersAPI.getUsers(1, 100, '', true);

        if (items.length) {
          setFollowersData(items);
        }

        if (totalCount) {
          setTotalFollowersCount(totalCount);
        }

        if (error) {
          throw new Error(error);
        }
      } catch (error) {
        console.warn(error);
      };
    }

    getFollowersData();
  }, []);

  return (
    <Container>
      <Header>
        Followers ({totalFollowersCount}):
      </Header>
      <Box>
        {followersData.map(({ id, name, photos: { small } }) => (
          <Follower id={id} name={name} photo={small} key={id} />
        ))}
      </Box>
    </Container>
  )
};

export default React.memo(RightBar);