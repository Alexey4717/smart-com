import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {  
  Typography, 
  Button, 
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
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

  const userId = Number(id);

  type Response = {
    resultCode: number;
    messages: string[];
  };

  const handleFollowUser = useCallback(async () => {
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
  }, [userId]);

  const handleUnfollowUser = useCallback(async () => {

    try {
      const response = await usersAPI.unfollow(userId);

      console.log('resultCode', response.resultCode);

      if (response.resultCode === 0) {
        dispatch(unfollowUser(id))
        enqueueSnackbar(
          `Вы успешно отписались от пользователя ${name}`,
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
        `Возникла ошибка при попытке отписаться от пользователя ${name}: ${error}`,
        { variant: 'error' }
      );
    }
  }, [userId]);

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
        sx={{ pr: 2 }}
        title={name}
        subtitle={status ? status : 'Статус отсутствует'}
        actionIcon={
          <Button
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'rgba(66, 82, 110, 0.86)' 
            }}
            variant="contained"
            aria-label={`info about ${name}`}
            onClick={followed ? handleUnfollowUser : handleFollowUser}
          >
            <Typography sx={{ mr: 1, fontSize: 14 }}>
              {followed ? 'Отписаться' : 'Подписаться'}
            </Typography>
            {followed ? <PersonRemoveIcon /> : <PersonAddIcon />}
          </Button>
        }
      />
    </ImageListItem>
  );
};

export default React.memo(User);