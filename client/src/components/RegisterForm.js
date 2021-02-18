import React, { useState } from 'react';
import {FormControl, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import { useStyles } from '../themes/theme';
import { CustomButton } from './Buttons';
import { registerUser, getUserArticles } from '../utils/apiEndpoints';
import { useDispatch } from 'react-redux';
import { userLogin } from '../actions';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      const articles = (await getUserArticles()).data;
      const data = res.data.user;

      dispatch(userLogin(data, articles));
      history.push('/articles');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.signupCard}>
      <Typography variant="h3">Welcome to Pokord!</Typography>
      <form className={classes.loginSignupForm} noValidate autoComplete="off">
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">First Name</InputLabel>
          <OutlinedInput 
            id="component-outlined" 
            label="First Name"
            name="firstName"
            onChange={onInputChange} />
        </FormControl>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
          <OutlinedInput 
            id="component-outlined" 
            label="Last Name"
            name="lastName"
            onChange={onInputChange} />
        </FormControl>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">E-Mail</InputLabel>
          <OutlinedInput 
            id="component-outlined" 
            label="E-Mail"
            name="email"
            onChange={onInputChange} />
        </FormControl>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">Password</InputLabel>
          <OutlinedInput 
            id="component-outlined" 
            label="Password"
            name="password"
            onChange={onInputChange} />
        </FormControl>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">Re-enter Password</InputLabel>
          <OutlinedInput 
            id="component-outlined" 
            label="Password"
            name="password2"
            onChange={onInputChange} />
        </FormControl>
        <CustomButton 
          classField={classes.loginButton} 
          text="Register"
          onClick={register} />
        <CustomButton 
          classField={classes.loginSignupToggleButton} 
          text="Already have an account? Login"
          onClick={() => history.push('/login')} />
      </form>
    </div>
  );
};

export default RegisterForm;