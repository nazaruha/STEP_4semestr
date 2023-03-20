import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RegisterSchema } from '../validation';
import { Formik, Field } from 'formik';
import { string } from 'yup';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const initialValues = {
  firstName: "", lastName: "", email: "", password: ""
};

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            validationSchema={RegisterSchema}
            >
              {({errors, touched, isSubmitting, isValid, dirty}) => {
                return (
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: "100%", height: "326px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Field as={TextField}
                          autoComplete="given-name"
                          name="firstName"
                          fullWidth
                          id="firstName"
                          label="First Name"
                        />
                        {errors.firstName && touched.firstName ? (<div style={{color: "red"}}>{errors.firstName}</div>) : null}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field as={TextField}
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                        {errors.lastName && touched.lastName ? (
                          <div style={{ color: "red"}}>{errors.lastName}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <Field as={TextField}
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                        {errors.email && touched.email ? (
                          <div style={{color: "red"}}>{errors.email}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <Field as={TextField}
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                        {errors.password && touched.password ? (
                          <div style={{color: "red"}}>{errors.password}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox value="allowExtraEmails" color="primary" />}
                          label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {isSubmitting ? "Loading" : "SignUp"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/sign-in" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                );
              }}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 19 }} />
      </Container>
    </ThemeProvider>
  );
}