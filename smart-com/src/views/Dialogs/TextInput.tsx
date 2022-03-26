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
import { setMessage, setTotalCount } from 'store/slices/dialogs';
import { totalCountSelector } from 'store/selectors/dialogs';
import { dialogsAPI } from 'store/api/dialogs';
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

interface OwnProps {
  userId: number
};

const TextInput = ({ userId }: OwnProps) => {

  const dispatch = useDispatch();
  const totalCount = useSelector(totalCountSelector);

  const handleSubmit = useCallback(async (values, {
    setErrors,
    setStatus,
    setSubmitting,
    resetForm
  }) => {
    try {
      const {
        // @ts-ignore
        data: { message },
        fieldsErrors,
        resultCode
      } = await dialogsAPI.sendMessage(userId, values.message);

      if (resultCode === 0) {
        dispatch(setMessage(message));
        dispatch(setTotalCount(totalCount + 1));
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
  }, [dispatch, totalCount]);

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
                  label="Enter your message"
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
          </InputContainer>
        </Form>
      )
      }
    </Formik >
  )
};

export default React.memo(TextInput);