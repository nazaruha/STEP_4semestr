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
        .matches(passwordRegExp, "Password must contain A-Z, a-z, 0-9. Addition can be symbols (#?!@$%^&*0-_)") // use our regex for verificatioln
        .label("Password"),

});

export const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(255)
        .required("Required")
        .label("First Name"),
    lastName: Yup.string()
        .max(255)
        .required("Required")
        .label("Last Name"),
    email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Required")
        .label("Email Address"),
    password: Yup.string()
        .required("Required")
        .max(255, "Maximum password length is 255")
        .min(6, "Password must have at least 6 characters")
        .matches(passwordRegExp, "Password must contain A-Z, a-z, 0-9. Addition can be symbols (#?!@$%^&*0-_)")
        .label("Password"),
    confirmPassword: Yup.string()
        .required("Required")
        .max(255)
        .min(6)
        .matches(passwordRegExp, "Confirm password must contain A-Z, a-z, 0-9. Addition can be symbols (#?!@$%^&*0-_)")
        .oneOf([Yup.ref("password")], "Passwords must match.")
});