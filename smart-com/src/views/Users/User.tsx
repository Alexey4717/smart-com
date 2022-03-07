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

  const handleFollowUser = useCallback(async () => {
    try {
      const {
        messages,
        resultCode,
      } = await usersAPI.follow(userId);

      if (resultCode === 0) {
        dispatch(followUser(id));
        enqueueSnackbar(
          `Вы успешно подписались на пользователя ${name}`,
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
        `Возникла ошибка при попытке подписаться на пользователя ${name}: ${error}`,
        { variant: 'error' }
      );
    }
  }, [dispatch, enqueueSnackbar, name, userId, id]);

  const handleUnfollowUser = useCallback(async () => {

    try {
      const {
        messages,
        resultCode,
      } = await usersAPI.unfollow(userId);

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
  }, [dispatch, enqueueSnackbar, name, userId, id]);

  return (
    <ImageListItem>
      <img
        src={`${userPhoto ? userPhoto : '/static/user-photo.png'}?w=248&fit=crop&auto=format`}
        srcSet={`${userPhoto ? userPhoto : '/static/user-photo.png'}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={name}
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