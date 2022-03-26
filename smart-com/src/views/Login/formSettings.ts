import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string().max(255).required('Enter username'),
  password: Yup.string().max(255).required('Enter password'),
  rememberMe: Yup.boolean(),
  isCaptcha: Yup.boolean(),
  captcha: Yup.string().when('isCaptcha', {
    is: true,
    then: Yup.string().nullable().required('Enter captcha')
  })
});

export const initialValues = {
  username: '',
  password: '',
  rememberMe: false,
  captcha: '',
  isCaptcha: false,
  submit: null,
};