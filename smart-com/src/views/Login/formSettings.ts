import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string().max(255).required('Введите имя пользователя'),
  password: Yup.string().max(255).required('Введите пароль'),
});

export const initialValues = {
  username: '',
  password: '',
  submit: null,
};