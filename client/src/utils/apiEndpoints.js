import Axios from 'axios';

export const loginUser = (formData) => {
  return Axios.post('/users/login', formData);
}

export const getUser = () => {
  return Axios.get('/users');
};