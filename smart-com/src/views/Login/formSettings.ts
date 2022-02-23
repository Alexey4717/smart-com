import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string().max(255).required('Введите имя пользователя'),
  password: Yup.string().max(255).required('Введите пароль'),
  rememberMe: Yup.boolean(),
  isCaptcha: Yup.boolean(),
  captcha: Yup.string().when('isCaptcha', {
    is: true,
    then: Yup.string().nullable().required('Введите captcha')
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