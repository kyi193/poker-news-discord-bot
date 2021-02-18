import React, { useState } from 'react';
import {FormControl, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import { useStyles } from '../themes/theme';
import { CustomButton } from './Buttons';
import { loginUser, getUserArticles } from '../utils/apiEndpoints';
import { useDispatch } from 'react-redux';
import { userLogin } from '../actions';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const articles = (await getUserArticles()).data;
      const data = res.data.user;

      dispatch(userLogin(data, articles));
      history.push('/articles');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.loginCard}>
      <Typography variant="h3">Welcome to Pokord!</Typography>
      <form className={classes.loginSignupForm} noValidate autoComplete="off">
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="component-outlined">E-mail</InputLabel>
          <OutlinedInput 
            id="component-outlined" 
            label="Email"
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
        <CustomButton 
          classField={classes.loginButton} 
          text="Login"
          onClick={login} />
        <CustomButton 
          classField={classes.loginSignupToggleButton} 
          text="Don't have an account? Register"
          onClick={() => history.push('/register')} />
      </form>
    </div>
  );
};

export default LoginForm;