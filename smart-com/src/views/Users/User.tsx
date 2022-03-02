import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import Avatar from '@mui/material/Avatar';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
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
    <ImageListItem>
      <img
        src={`${userPhoto ? userPhoto : '/static/user-photo.png'}?w=248&fit=crop&auto=format`}
        srcSet={`${userPhoto ? userPhoto : '/static/user-photo.png'}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={`photo of ${name}`}
        loading="lazy"
        //style={{ width: '600px', height: '600px' }}
      />
      <ImageListItemBar
        title={name}
        subtitle={status ? status : 'Статус отсутствует'}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${name}`}
            onClick={followed ? handleUnfollowUser : handleFollowUser}
          >
            {followed ? <PersonRemoveIcon /> : <PersonAddIcon /> }
            {followed ? 'Отписатсья' : 'Подписаться'}
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

export default React.memo(User);