import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { usersAPI } from 'store/api/users';
import type { GetItemsType } from 'store/api';
import type { UserType } from 'types/user';
import Follower from './Follower';

const Wrapper = styled('div')({
  margin: '10px 10px 10px 0',
});

const Header = styled('span')(({ theme }) => ({
  display: 'block',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  borderRadius: ' 10px 10px 0 0',
  textAlign: 'center'
}));

const Box = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '500px',
  overflow: 'scroll',
  padding: '5px',
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '0 0 10px 10px'
}));

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
        }: GetItemsType = await usersAPI.getUsers(1, 100, '', true);

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
    <Wrapper>
      <Header>
        Подписчики ({totalFollowersCount}):
      </Header>
      <Box sx={{
        '&::-webkit-scrollbar-thumb': {
          border: `5px solid white`
        },
      }}>
        {followersData.map(({ id, name, photos: { small } }) => (
          <Follower name={name} photo={small} key={id} />
        ))}
      </Box>
    </Wrapper>
  )
};

export default React.memo(RightBar);