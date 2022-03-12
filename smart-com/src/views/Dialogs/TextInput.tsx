import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Button, Box, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {
  Form,
  Formik,
  Field
} from 'formik';
import TextField from 'components/TextField';
import { setMessage } from 'store/slices/dialogs';
import { statusSelector } from 'store/selectors/chat';
import { dialogsAPI } from 'store/api/dialogs';
import {
  string as yupString,
  object as yupObject
} from 'yup';

export const validationSchema = yupObject().shape({
  message: yupString().max(255),
});

export const initialValues = {
  message: '',
  submit: null,
};

const Container = styled('div')({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderRadius: '0 0 5px 5px',
  padding: 15,
  backgroundColor: '#bfbaba'
});

interface OwnProps {
  userId: number
}

const TextInput = ({ userId }: OwnProps) => {

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (values, {
    setErrors,
    setStatus,
    setSubmitting,
    resetForm
  }) => {
    try {
      const {
        data: { message },
        fieldsErrors,
        resultCode
      } = await dialogsAPI.sendMessage(userId, values.message);

      if (resultCode === 0) {
        dispatch(setMessage(message));
        setStatus({ success: true });
        setSubmitting(false);
      } else if (fieldsErrors.length) {
        throw new Error(fieldsErrors[0]);
      } else {
        throw new Error();
      }

    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error?.response?.data?.detail ?? error.message });
      setSubmitting(false);
    }
    resetForm();
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
          <Container>
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
              disabled={isSubmitting}
            >
              <SendIcon />
            </Button>
          </Container>
        </Form>
      )
      }
    </Formik >
  )
};

export default React.memo(TextInput);