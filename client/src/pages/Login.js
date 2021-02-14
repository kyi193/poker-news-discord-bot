import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginSignupWrapper from '../components/LoginSignupWrapper';

const Login = () => {
  return (
    <LoginSignupWrapper text="Login">
      <LoginForm/>
    </LoginSignupWrapper>
  )
};

export default Login;