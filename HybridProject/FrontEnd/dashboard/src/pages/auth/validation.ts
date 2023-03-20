import * as Yup from "yup";

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*0-_]).{6,}$/;

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Required")
        .label("Email address"),
    password: Yup.string()
        .min(6, "Password must have at least 6 characters")
        .required("Required")
        .matches(passwordRegExp, "Password must contain A-Z, a-z, 0-9 additional symbols (#?!@$%^&*0-_)") // use our regex for verificatioln
        .label("Password"),

});