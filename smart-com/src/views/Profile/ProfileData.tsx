import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  Box
} from '@mui/material';
import TextField from 'components/TextField';
import Tooltip from '@mui/material/Tooltip';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {
  profileSelector
} from 'store/selectors/profile';
import { profileAPI } from 'store/api/profile';
import type { APIResponseType } from 'store/api';
import { setStatus, getProfileById } from 'store/slices/profile';
import Service from './Service';

const ProfileData = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    userId,
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    contacts,
    photos,
    aboutMe,
    userStatus
  } = useSelector(profileSelector);

  const services = Object.entries(contacts)

  const [open, setOpen] = useState<boolean>(false);
  const [editStatusMode, setEditStatusMode] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setOpen(open => !open);
  }, [setOpen]);

  const toggleEditStatusMode = useCallback(() => {
    setEditStatusMode(opened => !opened);
  }, [setEditStatusMode]);

  const uploadPhoto = useCallback(async (photoFile: File) => {
    try {
      const {
        resultCode,
        messages
      }: APIResponseType = await profileAPI.savePhoto(photoFile);

      if (resultCode === 0) {
        enqueueSnackbar(
          'Фотография успешно загружена',
          { variant: 'success' }
        );
      } else {
        if (messages.length) {
          throw new Error(messages[0]);
        } else {
          throw new Error();
        }
      }

    } catch (error) {
      enqueueSnackbar(
        `Возникла ошибка при загрузке фотографии${error ? `: ${error}` : ''}.`,
        { variant: 'error' }
      );
    };

    dispatch(getProfileById(userId));
  }, []);

  const changeUserStatus = useCallback(async (status: string) => {
    try {
      const {
        resultCode,
        messages
      }: APIResponseType = await profileAPI.updateStatus(status);

      if (resultCode === 0) {
        dispatch(setStatus(status));
        enqueueSnackbar(
          'Статус успешно обновлён',
          { variant: 'success' }
        );
      } else {
        if (messages.length) {
          throw new Error(messages[0]);
        } else {
          throw new Error();
        }
      }

    } catch (error) {
      enqueueSnackbar(
        `Возникла ошибка при обновлении статуса${error ? `: ${error}` : ''}.`,
        { variant: 'error' }
      );
    };

    toggleEditStatusMode();
  }, [editStatusMode]);

  return (
    <>
      <Box sx={{
        display: 'inline-block',
        position: 'relative'
      }}>
        <img src={photos.large} alt="profile-avatar" />
        <Tooltip title="Нажмите для загрузки 1 фотографии">
          <Button
            sx={{
              position: 'absolute',
              right: '10%',
              top: '10%'
            }}
            variant="text"
            component="label"
            onChange={e => uploadPhoto(e.target.files[0])}
          >
            <AddAPhotoIcon />
            <input
              type="file"
              hidden
            />
          </Button>
        </Tooltip>
      </Box>
      <Typography>
        Полное имя: {fullName}
      </Typography>
      {
        editStatusMode
          ? <TextField
            name='status'
            label={'Введите статус'}
            margin="normal"
            helperText="Нажмите на любое место вне поля, чтобы изменить статус"
            defaultValue={userStatus}
            onBlur={(event) => changeUserStatus(event.target.value)}
          />
          :
          <Tooltip title="Двойной клик по статусу для его изменения">
            <Typography
              sx={{ display: 'inline-block', cursor: 'pointer' }}
              onDoubleClick={toggleEditStatusMode}
            >
              Статус: {userStatus}
            </Typography>
          </Tooltip>
      }
      <Typography>В поиске работы: {lookingForAJob ? 'да' : 'нет'}</Typography>
      <Typography>Данные анкеты: {lookingForAJobDescription}</Typography>
      <Typography>Обо мне: {aboutMe}</Typography>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Ссылки на сторонные сервисы" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {services.map(service => (
              <Service name={service[0]} link={service[1]} key={service[0]} />
            ))}
          </List>
        </Collapse>
      </List>
    </>
  )
};

export default React.memo(ProfileData);