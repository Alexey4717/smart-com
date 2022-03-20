import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {
  Form,
  Formik,
  Field
} from 'formik';
import TextField from 'components/TextField';
import { sendMessage } from 'store/slices/chat';
import { statusSelector } from 'store/selectors/chat';
import {
  string as yupString,
  object as yupObject
} from 'yup';
import { InputContainer } from './styles';

const validationSchema = yupObject().shape({
  message: yupString().max(255),
});

const initialValues = {
  message: '',
  submit: null,
};

const TextInput = () => {

  const dispatch = useDispatch();
  const status = useSelector(statusSelector);

  const handleSubmit = useCallback((values, {
    setErrors,
    setStatus,
    setSubmitting,
    resetForm
  }) => {
    try {
      dispatch(sendMessage(values.message));
      setStatus({ success: true });
      setSubmitting(false);
      resetForm();
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err?.response?.data?.detail ?? err.message });
      setSubmitting(false);
    }
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
          <InputContainer>
            <Field name="message">
              {({ field, meta: { error, touched } }) => (
                <TextField
                  {...field}
                  error={Boolean(touched && error)}
                  helperText={touched && error}
                  label="Введите сообщение"
                />
              )}
            </Field>
            <Button
              sx={{ ml: 2 }}
              variant="contained"
              color="primary"
              type="submit"
              disabled={status !== 'ready' && isSubmitting}
            >
              <SendIcon />
            </Button>
          </InputContainer>
        </Form>
      )}
    </Formik >
  )
};

export default React.memo(TextInput);