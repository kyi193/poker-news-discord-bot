import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginSignupWrapper from '../components/LoginSignupWrapper';

const Register = () => {
  return (
    <LoginSignupWrapper text="Register">
      <RegisterForm />
    </LoginSignupWrapper>
  )
};

export default Register;