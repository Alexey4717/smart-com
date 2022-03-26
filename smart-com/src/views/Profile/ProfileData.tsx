import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Typography,
  List,
  Box
} from '@mui/material';
import TextField from 'components/TextField';
import Tooltip from '@mui/material/Tooltip';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import {
  profileSelector
} from 'store/selectors/profile';
import { profileAPI } from 'store/api/profile';
import type { APIResponseType } from 'store/api';
import { setStatus, getProfileById } from 'store/slices/profile';
import Service from './Service';
import {
  Container,
  Heading,
  AvatarContainer,
  ProfileAvatar,
  AddPhoto,
  FullName,
  ProfileItems,
  MainInfo,
  StatusWrapper,
  SocialsHeading,
  FormHeading,
  FormItems,
  FormTitle,
  FormItem,
  LookingForAJobItem
} from './styles';

interface OwnProps {
  isAuthUser: boolean;
};

const ProfileData = ({ isAuthUser }: OwnProps) => {

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
    if (isAuthUser) {
      setEditStatusMode(opened => !opened);
    }
  }, [setEditStatusMode]);

  const uploadPhoto = useCallback(async (photoFile: File) => {
    try {
      const {
        resultCode,
        messages
      }: APIResponseType = await profileAPI.savePhoto(photoFile);

      if (resultCode === 0) {
        enqueueSnackbar(
          'Photo uploaded successfully',
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
        `There was an error uploading the photo${error ? `: ${error}` : ''}.`,
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
          'Status updated successfully',
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
        `An error occurred while updating the status${error ? `: ${error}` : ''}.`,
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

  const tooltipTitleForStatus = useMemo(() => (
    isAuthUser
      ? (
        userStatus
          ? 'Double click on status to change it'
          : 'Double click to add status'
      )
      : ''
  ), [isAuthUser, userStatus]);

  return (
    <Container>
      <Heading>
        <AvatarContainer>
          <ProfileAvatar
            alt="profile-avatar"
            src={photos.large}
          />
          {isAuthUser && (
            <Tooltip title="Click to download 1 photo">
              <AddPhoto onChange={handleUploadPhoto}>
                <AddAPhotoIcon color="secondary" />
                <input type="file" hidden />
              </AddPhoto>
            </Tooltip>
          )}
        </AvatarContainer>
        <FullName variant='h3'>
          {fullName}
        </FullName>
      </Heading>
      <ProfileItems>
        <MainInfo>
          <StatusWrapper onDoubleClick={toggleEditStatusMode}>
            Status:
            <br />
            {
              editStatusMode
                ? <TextField
                  sx={{ width: '100%', display: 'block' }}
                  name='status'
                  label={'Enter status'}
                  margin="normal"
                  helperText="Click anywhere outside the field to change the status"
                  defaultValue={userStatus}
                  onBlur={(event) => changeUserStatus(event.target.value)}
                />
                :
                <Tooltip
                  title={tooltipTitleForStatus}
                >
                  <Typography
                    sx={{
                      display: 'inline-block',
                      cursor: isAuthUser ? 'pointer' : 'inherit'
                    }}
                  >
                    {userStatus ? userStatus : (isAuthUser && <AddIcon />)}
                  </Typography>
                </Tooltip>
            }
          </StatusWrapper>
          <Box>
            {
              Boolean(servicesLinks.length)
              && <SocialsHeading>
                Social network:
              </SocialsHeading>
            }
            <List
              sx={{ display: 'flex', flexWrap: 'wrap' }}
              component="div"
              disablePadding
            >
              {servicesLinks}
            </List>
          </Box>
        </MainInfo>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexBasis: '60%'
        }}>
          <FormHeading>
            User profile:
          </FormHeading>
          <FormItems>
            <FormTitle>
              Applicant Status:
            </FormTitle>
            <FormItem>
              <LookingForAJobItem
                sx={{
                  color: lookingForAJob ? 'green' : '#ff3d00'
                }}
              >
                <CircleIcon />
                {lookingForAJob ? 'I am looking for a job' : 'not looking for a job'}
              </LookingForAJobItem>
            </FormItem>
          </FormItems>
          <FormItems>
            <FormTitle>
              Profile data:
            </FormTitle>
            <FormItem>
              {lookingForAJobDescription}
            </FormItem>
          </FormItems>
          <FormItems>
            <FormTitle>
              About me:
            </FormTitle>
            <FormItem>
              {aboutMe}
            </FormItem>
          </FormItems>
        </Box>
      </ProfileItems>
    </Container>
  )
};

export default React.memo(ProfileData);