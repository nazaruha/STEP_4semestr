// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { RegisterSchema } from '../validation';
// import { Formik, Field } from 'formik';
// import { string } from 'yup';
// import { useActions } from '../../../hooks/useActions';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const initialValues = {
//   firstName: "",
//   lastName: "", 
//   email: "", 
//   password: "", 
//   confirmPassword: ""
// };

// const theme = createTheme();

// export default function SignUp() {
//   const { InsertUser } = useActions();

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });

//     const newUser = {};
//     InsertUser(newUser);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Formik
//             initialValues={initialValues}
//             onSubmit={() => {}}
//             validationSchema={RegisterSchema}
//             >
//               {({errors, touched, isSubmitting, isValid, dirty}) => {
//                 return (
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: "100%", height: "326px" }}>
//                     <Grid container spacing={2}>
//                       <Grid item xs={12} sm={6}>
//                         <Field as={TextField}
//                           autoComplete="given-name"
//                           name="firstName"
//                           fullWidth
//                           id="firstName"
//                           label="First Name"
//                         />
//                         {errors.firstName && touched.firstName ? (<div style={{color: "red"}}>{errors.firstName}</div>) : null}
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Field as={TextField}
//                           fullWidth
//                           id="lastName"
//                           label="Last Name"
//                           name="lastName"
//                           autoComplete="family-name"
//                         />
//                         {errors.lastName && touched.lastName ? (
//                           <div style={{ color: "red"}}>{errors.lastName}</div>
//                         ) : null}
//                       </Grid>
//                       <Grid item xs={12}>
//                         <Field as={TextField}
//                           fullWidth
//                           id="email"
//                           label="Email Address"
//                           name="email"
//                           autoComplete="email"
//                         />
//                         {errors.email && touched.email ? (
//                           <div style={{color: "red"}}>{errors.email}</div>
//                         ) : null}
//                       </Grid>
//                       <Grid item xs={12}>
//                         <Field as={TextField}
//                           fullWidth
//                           name="password"
//                           label="Password"
//                           type="password"
//                           id="password"
//                           autoComplete="new-password"
//                         />
//                         {errors.password && touched.password ? (
//                           <div style={{color: "red"}}>{errors.password}</div>
//                         ) : null}
//                       </Grid>
//                       <Grid item xs={12}>
//                         <Field as={TextField}
//                           fullWidth
//                           name="confirm-password"
//                           label="Confirm password"
//                           type="password"
//                           id="confirm-password"
//                           autoComplete="new-confirm-password"
//                         />
//                         {errors.confirmPassword && touched.confirmPassword ? (
//                           <div style={{color: "red"}}>{errors.confirmPassword}</div>
//                         ) : null}
//                       </Grid>
//                       <Grid item xs={12}>
//                         <FormControlLabel
//                           control={<Checkbox value="allowExtraEmails" color="primary" />}
//                           label="I want to receive inspiration, marketing promotions and updates via email."
//                         />
//                       </Grid>
//                     </Grid>
//                     <Button
//                       disabled={!(isValid && dirty)}
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       sx={{ mt: 3, mb: 2 }}
//                     >
//                       {isSubmitting ? "Loading" : "SignUp"}
//                     </Button>
//                     <Grid container justifyContent="flex-end">
//                       <Grid item>
//                         <Link href="/sign-in" variant="body2">
//                           Already have an account? Sign in
//                         </Link>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 );
//               }}
//           </Formik>
//         </Box>
//         <Copyright sx={{ mt: 19 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
import React, { useState } from "react";
import { Formik, Field } from "formik";
import Grid from '@mui/material/Grid';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { RegisterSchema } from "../validation";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Navigate } from "react-router-dom";

const Register: React.FC = () => {
  const [role, setRole] = useState("Users");
  const { message } = useTypedSelector((store) => store.UserReducer);
  const { InsertUser } = useActions();

  console.log(message);
  if (message === "User has been created.") {
    return <Navigate to="/" />;
  }

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newUser = {
      Name: data.get("firstName"),
      Surname: data.get("lastName"),
      Email: data.get("email"),
      Role: role,
      Password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    InsertUser(newUser);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={RegisterSchema}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                sx={{ my: 3 }}
                onSubmit={handleSubmit}
                component="form"
                noValidate
              >
                <Typography color="textPrimary" variant="h4">
                  Create a new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Use your email to create a new account
                </Typography>
                <Field
                  as={TextField}
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  variant="outlined"
                />
                {errors.firstName && touched.firstName ? (
                  <div style={{ color: "red" }}>{errors.firstName}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  variant="outlined"
                />
                {errors.lastName && touched.lastName ? (
                  <div style={{ color: "red" }}>{errors.lastName}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                />
                {errors.email && touched.lastName ? (
                  <div style={{ color: "red" }}>{errors.email}</div>
                ) : null}
                <FormControl sx={{ width: "100%" }} margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    defaultValue={role}
                    label={role}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Users"}>Users</MenuItem>
                    <MenuItem value={"Administrators"}>Administrators</MenuItem>
                  </Select>
                </FormControl>
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Confirm password"
                  margin="normal"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                ) : null}
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                  }}
                ></Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? "Loading" : "Sign Up Now"}
                  </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                       <Grid item>
                         <Link href="/" variant="body2">
                           Already have an account? Sign in
                         </Link>
                       </Grid>
                     </Grid>
              </Box>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};
export default Register;