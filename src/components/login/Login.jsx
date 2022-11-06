import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// mui imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import InputField from '../../common/inputField/InputField';
import P from '../../common/ptag/P';

import * as FormValidations from '../../utils/Validations';

import api from '../../api';

import { loginIn } from '../../actions';

const theme = createTheme();
function Login() {
  // state to set form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // states for validation errors
  const [error, setError] = useState({
    key: '',
    message: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setFormData({ ...formData, ...obj });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidated = FormValidations.login(formData);
    setError({
      key: isValidated?.key,
      message: isValidated?.message,
    });
    if (isValidated?.key) {
      return;
    }

    try {
      const response = await api('post', 'login', formData);
      if (response.status === 200) {
        dispatch(loginIn(response?.data));
        toast.success('LoggedIn Successfully');
        navigate('/dashboard/registeredcars');
      }
    } catch (err) {
      toast.error(err.response.data);
    }
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <InputField
                  label="Email Address"
                  onChange={(e) => setState('email', e.target.value)}
                  value={formData?.email}
                />
                {error.key === 'Email' ? <P className="error" text={error.message} /> : ''}
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField
                  label="Password"
                  onChange={(e) => setState('password', e.target.value)}
                  value={formData?.password}
                />
                {error.key === 'Password' ? <P className="error" text={error.message} /> : ''}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
