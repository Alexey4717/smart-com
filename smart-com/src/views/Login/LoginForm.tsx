import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Form as FormikForm,
  useFormik,
  FormikProvider,
  Field
} from 'formik';
import {
  Alert,
  Box,
  Button,
  Divider,
  Typography,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { captchaUrlSelector } from 'store/selectors/security'
import TextField from 'components/TextField';
import {
  initialValues,
  validationSchema
} from './formSettings';

const CaptchaImage = styled('img')(() => ({
  display: 'block',
  margin: '10px auto'
}))

const LoginForm: FC = () => {
  const { login } = useAuth() as any;
  const captchaUrl = useSelector(captchaUrlSelector);

  const isMountedRef = useIsMountedRef();

  const onSubmit = async (values, {
    setErrors,
    setStatus,
    setSubmitting,
  }) => {
    try {
      await login(values.username, values.password, values.rememberMe, values.captcha);

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const { 
    setFieldValue, 
    errors, 
    isSubmitting, 
    values, 
    handleChange, 
    handleBlur 
  } = formik;

  useEffect(() => {
    if (captchaUrl) {
      setFieldValue('isCaptcha', true)
    } else {
      setFieldValue('isCaptcha', false)
    }
  }, [setFieldValue, captchaUrl]);

  return (
    <FormikProvider value={formik}>
      <FormikForm>
        {isSubmitting && errors && errors.submit && (
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
        <Box sx={{
          mt: '24px',
          '& > label': {
            display: 'flex',
            alignItems: 'center'
          }
        }}>
          <label>
            <Checkbox
              name="rememberMe"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rememberMe}
            />
            <Typography sx={{ ml: '24px', cursor: 'pointer' }}>
              Запомнить меня
            </Typography>
          </label>
        </Box>
        {
          captchaUrl
          && <Box>
            <Divider sx={{ my: '24px' }} />
            <Typography sx={{ textAlign: 'center', color: 'red' }}>
              Вы произвели 10 или более неудачных попыток авторизации.
              Для дальнейшей аутентификации пользователя требуется ввести символы из captcha.
            </Typography>
            <CaptchaImage src={captchaUrl} alt="captcha" />
            <Field name="captcha">
              {({ field, meta: { error, touched } }) => (
                <TextField
                  {...field}
                  label="Captcha"
                  error={Boolean(touched && error)}
                  helperText={touched && error}
                  margin="normal"
                />
              )}
            </Field>
          </Box>
        }
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
      </FormikForm>
    </FormikProvider>
  );
};

export default LoginForm;