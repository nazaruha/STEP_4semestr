import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required(''),
    password: Yup.string()
        .min(6, 'Too short!')
        .max(50, "Too long!")
        .required('')
});