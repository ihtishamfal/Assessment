import React, { useState } from 'react';

import { toast } from 'react-toastify';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputField from '../../common/inputField/InputField';
import P from '../../common/ptag/P';

import * as FormValidations from '../../utils/Validations';

import api from '../../api';

const theme = createTheme();

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }); // state to set form data
  const [error, setError] = useState({
    key: '',
    message: '',
  }); // states for validation errors

  const navigate = useNavigate();

  const setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setFormData({ ...formData, ...obj });
  };

  // Submit Data to register
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidated = FormValidations.register(formData);
    setError({
      key: isValidated?.key,
      message: isValidated?.message,
    });
    if (isValidated?.key) {
      return;
    }
    try {
      const obj = {
        email: formData?.email,
        password: formData?.password,
      };
      const response = await api('post', 'register', obj);
      if (response.statusText === 'Created') {
        toast.success('Registration Successful');
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  // eslint-disable-next-line no-return-assign
  // Submit Data to register
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="First Name"
                  onChange={(e) => setState('firstName', e.target.value)}
                  value={formData?.firstName}
                />
                {error.key === 'First Name' ? <P className="error" text={error.message} /> : ''}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Last Name"
                  onChange={(e) => setState('lastName', e.target.value)}
                  value={formData?.lastName}
                />
                {error.key === 'Last Name' ? <P className="error" text={error.message} /> : ''}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Email Address"
                  onChange={(e) => setState('email', e.target.value)}
                  value={formData?.email}
                />
                {error.key === 'Email' ? <P className="error" text={error.message} /> : ''}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Password"
                  onChange={(e) => setState('password', e.target.value)}
                  value={formData?.password}
                />
                {error.key === 'Password' ? <P className="error" text={error.message} /> : ''}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
