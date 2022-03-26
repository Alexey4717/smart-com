import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Form as FormikForm,
  Formik,
  Field
} from 'formik';
import {
  Alert,
  Box,
  Button,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import { profileAPI } from 'store/api/profile';
import { profileSelector } from 'store/selectors/profile';
import { getProfileById } from 'store/slices/profile';
import Checkbox from 'components/Checkbox';
import { styled } from '@mui/system';
import { 
  validationSchema, 
  formInitialValues, 
  fields, 
  contacts 
} from './formSettings';

const Header = styled('span')(({ theme }) => ({
  display: 'inline-block',
  textTransform: 'uppercase',
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  margin: '32px 0',
  fontSize: '22px',
  [theme.breakpoints.down('lg')]: {
    borderBottom: 'none',
    margin: '20px 0',
    fontSize: '18px',
  }
}));

const Form = styled(FormikForm)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '0 16px'
  }
}))

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
          `User data updated successfully`,
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
        `An error occurred during authorization: ${error}`,
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
            User edit mode:
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
            <Grid container spacing={2}>
              {fields.map(({ type, name, label }, index) => {
                const isIndexOdd = index % 2;
                return (
                  <Grid
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    item
                    xl={isIndexOdd ? 9 : 3}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                  >
                    <Field name={name} key={name}>
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
                              xs={{ my: 'auto' }}
                              checked={values.lookingForAJob}
                            />}
                        </>
                      )}
                    </Field>
                  </Grid>
                )
              })}
            </Grid>
            <Header sx={{ borderBottom: 'none' }}>
              Contacts:
            </Header>
            <Grid container spacing={2}>
              {contacts.map(({ label, name }) => (
                <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
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
                </Grid>
              ))}
            </Grid>
            <Grid 
              py={4}
              container 
              spacing={2}
            >
              <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Update data
                </Button>
              </Grid>
              <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="reset"
                  variant="outlined"
                  fullWidth
                >
                  Reset data
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileEditor;