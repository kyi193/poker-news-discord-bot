import React from 'react';
import {FormControl, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import { useStyles } from '../themes/theme';
import { CustomButton } from './Buttons';

const LoginForm = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.loginCard}>
      <Typography variant="h3">Welcome to Pokord</Typography>
      <form className={classes.loginSignupForm} noValidate autoComplete="off">
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">E-mail</InputLabel>
          <OutlinedInput id="component-outlined" label="Email" />
        </FormControl>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">Password</InputLabel>
          <OutlinedInput id="component-outlined" label="Password" />
        </FormControl>
        <CustomButton classField={classes.loginButton} text="Login" />
      </form>
    </div>
  );
};

export default LoginForm;