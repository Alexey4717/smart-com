import type { FC } from 'react';
import {
  Form,
  Formik,
  Field
} from 'formik';
import {
  Alert,
  Box,
  Button,
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import TextField from 'components/TextField';
import {
  initialValues,
  validationSchema
} from './formSettings';

const LoginForm: FC = () => {
  const { login } = useAuth() as any;

  const isMountedRef = useIsMountedRef();

  const onSubmit = async (values, {
    setErrors,
    setStatus,
    setSubmitting,
  }) => {
    try {
      await login(values.username, values.password);

      if (isMountedRef.current) {
        setStatus({ success: true });
        setSubmitting(false);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err?.response?.data?.detail ?? err.message });
        setSubmitting(false);
      }
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
      }) => (
        <Form>
          {errors.submit && (
            <Box mb={2}>
              <Alert severity="error">
                {errors.submit}
              </Alert>
            </Box>
          )}
          <Field name="username">
            {({ field, meta: { error, touched } }) => (
              <TextField
                {...field}
                label='Имя пользователя'
                error={Boolean(touched && error)}
                helperText={touched && error}
                margin="normal"
                autoFocus
              />
            )}
          </Field>
          <Field name="password">
            {({ field, meta: { error, touched } }) => (
              <TextField
                {...field}
                type="password"
                label="Пароль"
                error={Boolean(touched && error)}
                helperText={touched && error}
                margin="normal"
              />
            )}
          </Field>
          <Box mt={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Войти
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;