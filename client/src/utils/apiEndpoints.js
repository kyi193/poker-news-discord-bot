import Axios from 'axios';

export const loginUser = (formData) => {
  return Axios.post('/users/login', formData);
}