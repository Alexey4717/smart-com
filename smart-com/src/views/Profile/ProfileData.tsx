import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Typography,
  List,
  Button,
  Box,
  Avatar
} from '@mui/material';
import TextField from 'components/TextField';
import Tooltip from '@mui/material/Tooltip';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from '@mui/material/styles';
import {
  profileSelector
} from 'store/selectors/profile';
import { profileAPI } from 'store/api/profile';
import type { APIResponseType } from 'store/api';
import { setStatus, getProfileById } from 'store/slices/profile';
import Service from './Service';

const ProflieAvatar = styled(Avatar)(({ theme }) => ({
  width: 300,
  height: 300,
  border: `10px solid ${theme.palette.background.default}`
}));

const AddPhotoButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: '10%',
  top: '10%',
  paddingBottom: '8px',
  backgroundColor: '#fff',
  minWidth: '45px',
  minHeight: '45px',
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  border: `2px solid ${theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: '#fff'
  }
}));

const LookingForAJobItem = styled(Box)({
  display: 'inline-flex',
  alugnItems: 'center',
  fontWeight: 'bold',
  '& > svg': {
    width: '15px',
    marginRight: 5
  }
})

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

  const services = Object.entries(contacts);

  const [editStatusMode, setEditStatusMode] = useState<boolean>(false);

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
  }, [dispatch, enqueueSnackbar, userId]);

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
  }, [dispatch, enqueueSnackbar, toggleEditStatusMode]);

  const handleUploadPhoto = (event) => {
    uploadPhoto(event.target.files[0])
  };

  const servicesLinks = useMemo(() => (
    services.map(service => (
      <Service name={service[0]} link={service[1]} key={service[0]} />
    ))
  ), [services]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-end',
        '& > *:nth-last-of-type': {
          flexGrow: 1
        }
      }}>
        <Box sx={{
          display: 'inline-block',
          position: 'relative',
          zIndex: 1,
          mb: '-150px',
          ml: 5
        }}>
          <ProflieAvatar
            alt="profile-avatar"
            src={photos.large}
          />
          <Tooltip title="Нажмите для загрузки 1 фотографии">
            <AddPhotoButton
              variant="text"
              //component="label"
              onChange={handleUploadPhoto}
            >
              <AddAPhotoIcon />
              <input
                type="file"
                hidden
              />
            </AddPhotoButton>
          </Tooltip>
        </Box>
        <Typography
          sx={{
            fontSize: '60px',
            ml: 5
          }}
          variant='h3'
        >
          {fullName}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        backgroundColor: '#fff',
        p: 2,
        borderRadius: 2,
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexBasis: '40%'
        }}>
          <Typography
            sx={{ display: 'inline-block', fontSize: '30px', pr: 5, pl: 45 }}
            onDoubleClick={toggleEditStatusMode}
          >
            Статус:
            {
              editStatusMode
                ? <TextField
                  sx={{ width: '100%', display: 'block' }}
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
                    sx={{ cursor: 'pointer' }}
                  >
                    {userStatus}
                  </Typography>
                </Tooltip>
            }
          </Typography>
          <Box>
            {Boolean(servicesLinks.length)
              && <Typography sx={{ pb: 2 }} component='p'>
                Соцсети:
              </Typography>}
            <List
              sx={{ display: 'flex' }}
              component="div"
              disablePadding
            >
              {servicesLinks}
            </List>
          </Box>

        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexBasis: '60%'
        }}>
          <Typography sx={{ fontSize: '30px' }}>
            Анкета пользователя:
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            pt: 3
          }}>
            <Typography
              sx={{ textDecoration: 'underline', flexBasis: '25%' }}
              component="span"
            >
              Статус соискателя:
            </Typography>
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              flexBasis: '75%'
            }}>
              {
                lookingForAJob
                  ? <LookingForAJobItem sx={{ color: 'green' }}>
                    <CircleIcon />
                    нахожусь в поиске работы
                  </LookingForAJobItem>
                  : <LookingForAJobItem sx={{ color: '#ff3d00' }}>
                    <CircleIcon />
                    не ищу работу
                  </LookingForAJobItem>
              }
            </Box>
          </Box>
          <Box sx={{ display: 'flex', pt: 3 }}>
            <Typography sx={{ textDecoration: 'underline', flexBasis: '25%' }}>
              Данные анкеты:
            </Typography>
            <Box sx={{ flexBasis: '75%' }}>{lookingForAJobDescription}</Box>
          </Box>
          <Box sx={{ display: 'flex', pt: 3 }}>
            <Typography sx={{ textDecoration: 'underline', flexBasis: '25%' }}>Обо мне:</Typography>
            <Box sx={{ flexBasis: '75%' }}>{aboutMe}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default React.memo(ProfileData);