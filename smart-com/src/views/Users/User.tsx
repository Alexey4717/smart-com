import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import Avatar from '@mui/material/Avatar';
import { getUserByIdSelector } from 'store/selectors/users';
import { followUser, unfollowUser } from 'store/slices/users';
import { usersAPI } from 'store/api/users';
import type { APIResponseType } from 'store/api';

interface OwnProps {
  id: string
};

const User = ({ id }: OwnProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    name,
    status,
    followed,
    photos: {
      large: userPhoto
    }
  } = useSelector(getUserByIdSelector(id));

  type Response = {
    resultCode: number;
    messages: string[];
  }

  const handleFollowUser = useCallback(async () => {
    const userId = Number(id)
    try {
      const response = await usersAPI.follow(userId);

      console.log('response', response);

      if (response.resultCode === 0) {
        dispatch(followUser(id));
        enqueueSnackbar(
          `Вы успешно подписались на пользователя ${name}`,
          { variant: 'success' }
        );
      } else {
        if (response.messages.length) {
          throw new Error(response.messages[0]);
        } else {
          throw new Error()
        }
      }
    } catch (error) {
      enqueueSnackbar(
        `Возникла ошибка при попытке подписаться на пользователя ${name}: ${error}`,
        { variant: 'error' }
      );
    }
  }, [dispatch]);

  const handleUnfollowUser = useCallback(() => {
    try {
      const {
        resultCode,
        messages
      }: any = usersAPI.follow(id);

      console.log('resultCode', resultCode);

      if (resultCode === 0) {
        dispatch(unfollowUser(id))
        enqueueSnackbar(
          `Вы успешно отписались от пользователя ${name}`,
          { variant: 'success' }
        );
      } else {
        if (messages.length) {
          throw new Error(messages[0]);
        } else {
          throw new Error()
        }
      }
    } catch (error) {
      enqueueSnackbar(
        `Возникла ошибка при попытке отписаться от пользователя ${name}: ${error}`,
        { variant: 'error' }
      );
    }
  }, []);

  return (
    <div>
      <Avatar
        sx={{ width: 200, height: 200 }}
        src={userPhoto ? userPhoto : "/broken-image.jpg"}
        alt={`photo of ${name}`}
      />
      <div>name: {name}</div>
      <div>status: {status}</div>
      <div>{followed ? 'В друзьях' : 'Не в друзьях'}</div>
      <button onClick={followed ? handleUnfollowUser : handleFollowUser}>
        {followed ? 'Отписатсья': 'Подписаться'}
      </button>
    </div>
  );
};

export default React.memo(User);