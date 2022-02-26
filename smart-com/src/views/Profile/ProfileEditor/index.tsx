import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import {
  Form,
  Formik,
  Field
} from 'formik';
import {
  Alert,
  Box,
  Button,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import { profileAPI } from 'store/api/profile';
import { profileSelector } from 'store/selectors/profile';
import { getProfileById } from 'store/slices/profile';
import Checkbox from 'components/Checkbox';
import { styled } from '@mui/system';
import { validationSchema, formInitialValues, fields, contacts } from './formSettings';

const Header = styled('span')(({ theme }) => ({
  display: 'inline-block',
  textTransform: 'uppercase',
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  margin: '32px 0',
  fontSize: '22px'
}));

interface OwnProps {
  setIsEditMode: (boolean) => void;
};

const ProfileEditor = ({ setIsEditMode }: OwnProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  const profile = useSelector(profileSelector);
  const initialValues = formInitialValues(profile);

  const onSubmit = async (values, {
    setErrors,
    setStatus,
    setSubmitting,
  }) => {

    try {
      const {
        resultCode,
        messages
      } = await profileAPI.saveProfile(values);

      if (resultCode === 0) {
        setStatus({ success: true });
        setSubmitting(false);
        enqueueSnackbar(
          `Данные пользователя успешно обновлены`,
          { variant: 'success' }
        );
        dispatch(getProfileById(profile.userId))
        setIsEditMode(false);
      } else {
        if (messages) {
          throw new Error(messages[0]);
        } else {
          throw new Error();
        }
      }

    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error?.response?.data?.detail ?? error.message });
      setSubmitting(false);
      enqueueSnackbar(
        `Возникла ошибка в процессе авторизации: ${error}`,
        { variant: 'error' }
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        isSubmitting,
        values
      }) => (
        <Form>
          <Header>
            Режим редактирования данных пользователя:
          </Header>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column', 
          }}>
            {errors.submit && (
              <Box mb={2}>
                <Alert severity="error">
                  {errors.submit}
                </Alert>
              </Box>
            )}
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              '& > *:nth-of-type(even)': {
                flexBasis: '74%'
              },
              '& > *:nth-of-type(odd)': {
                flexBasis: '22%'
              }
            }} >
              {fields.map(({ type, name, label }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Field name={name} key={name} >
                    {({ field, meta: { error, touched } }) => (
                      <>
                        {type === 'text'
                          && <TextField
                            {...field}
                            label={label}
                            error={Boolean(touched && error)}
                            helperText={touched && error}
                            margin="normal"
                          />}
                        {type === 'checkbox'
                          && <Checkbox
                            {...field}
                            label={label}
                            name={name}
                            error={Boolean(touched && error)}
                            helperText={touched && error}
                            margin="normal"
                            checked={values.lookingForAJob}
                          />}
                      </>
                    )}
                  </Field>
                </Box>
              ))}
            </Box>
            <Header sx={{ borderBottom: 'none'}}>
              Контакты:
            </Header>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              '& > *': {
                flexBasis: '22%'
              }
            }}>
              {contacts.map(({ label, name }) => (
                <Field name={name}>
                  {({ field, meta: { error, touched } }) => (
                    <TextField
                      {...field}
                      label={label}
                      error={Boolean(touched && error)}
                      helperText={touched && error}
                      margin="normal"
                    />
                  )}
                </Field>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                pt: 7,
                '& > button': {
                  width: '300px'
                },
                '& > button:nth-of-type(1)': {
                  mr: '58px'
                }
              }} 
              mt={2}
            >
              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
              >
                Обновить данные профиля
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="reset"
                variant="outlined"
              >
                Сбросить данные формы
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileEditor;