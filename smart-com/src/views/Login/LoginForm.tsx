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
  Typography
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { captchaUrlSelector } from 'store/selectors/security'
import TextField from 'components/TextField';
import Checkbox from 'components/Checkbox';
import {
  initialValues,
  validationSchema
} from './formSettings';
import { CaptchaImage } from './styles';

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
    isSubmitting
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
              label='User name'
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
              label="Password"
              error={Boolean(touched && error)}
              helperText={touched && error}
              margin="normal"
              withIcon
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
          <Field name="lookingForAJob">
            {({ field, meta: { error, touched } }) => (
              <Checkbox
                {...field}
                label={"Remember me"}
                name="rememberMe"
                error={Boolean(touched && error)}
                helperText={touched && error}
                margin="normal"
              />
            )}
          </Field>
        </Box>
        {
          captchaUrl
          && <Box>
            <Divider sx={{ my: '24px' }} />
            <Typography sx={{ textAlign: 'center', color: 'red' }}>
              You have made 10 or more failed login attempts.
              For further user authentication, you need to enter characters from the captcha.
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
            Sign in
          </Button>
        </Box>
      </FormikForm>
    </FormikProvider>
  );
};

export default LoginForm;