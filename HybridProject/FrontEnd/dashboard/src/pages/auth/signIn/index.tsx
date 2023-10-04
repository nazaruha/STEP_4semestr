import * as React from 'react';
import '../../../App.css';
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
import {Formik, Field, validateYupSchema} from 'formik';
import { LoginSchema } from '../validation'; 
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';

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

const values = { email: "", password: "", rememberMe: false };

const theme = createTheme();

export default function SignIn() {
  const { message, isAuth } = useTypedSelector((store) => store.UserReducer);
  const { LoginUser } = useActions();

  if (message === "You have logged in!") {
    return <Navigate to="/dashboard" />
  }

  if(isAuth) { // якщо залогінений
    return <Navigate to="/dashboard" />
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      Email: data.get('email'),
      Password: data.get('password')
    };
    LoginUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={values}
            onSubmit={() => {}}
            validationSchema={LoginSchema}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => {
              return (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, width: "100%", height: "326px" }}
                >
                  <Field as={TextField} // буде работать і приймати всі стилі і параметри тега TextField з mui.com
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  {errors.email && touched.email ? ( // тернарна перервірка чи не пуста помилка
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                  <Field as={TextField}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : null}
                  <FormControlLabel
                    control={<Checkbox id="rememberMe" name="rememberMe" color="primary"/>}
                    label="Remember me"
                  />
                  <Button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    { isSubmitting ? "Loading" : "Sign In" } 
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/sign-up" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              );
            }}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}