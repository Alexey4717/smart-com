import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { dialogsAPI } from 'store/api/dialogs';
import { setDialog } from 'store/slices/dialogs';
import paths from 'routing/paths';
import {
  Wrapper,
  Items,
  Avatar,
  NameItem
} from './styles';
import { APIResponseType } from 'store/api';

const dialogsPath = paths.dialogs;
const profilePath = paths.profile;

interface OwnProps {
  id: number
  name: string
  photo: string
};

const Follower = ({ id, name, photo }: OwnProps) => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const startDialog = useCallback(async (event) => {
    event.stopPropagation();
    try {
      const {
        resultCode,
        messages
      }: APIResponseType = await dialogsAPI.startDialog(id);

      if (resultCode === 0) {
        dispatch(setDialog(id.toString()));
      } else {
        if (messages) {
          throw new Error(messages[0])
        } else {
          throw new Error()
        }
      }
    } catch (error) {
      enqueueSnackbar(
        `Возникла ошибка при попытке установить диалог ${error ? error : ''}`,
        { variant: 'error' }
      );
    }
  }, []);

  return (
    <NavLink
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}
      to={profilePath + id}
    >
      <Wrapper>
        <Avatar
          alt={name.toUpperCase()}
          src={photo ? photo : "dummy.js"}
        />
        <Items>
          <NameItem>
            {name}
          </NameItem>
          <NavLink
            style={{
              textDecoration: 'none',
              color: 'inherit',
              fontSize: 14
            }}
            to={dialogsPath + id}
            onClick={startDialog}
          >
            Написать
          </NavLink>
        </Items>
      </Wrapper>
    </NavLink>
  );
};

export default React.memo(Follower);