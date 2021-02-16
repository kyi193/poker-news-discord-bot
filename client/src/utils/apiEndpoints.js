import Axios from 'axios';

export const loginUser = (formData) => {
  return Axios.post('/users/login', formData);
}

export const getUser = () => {
  return Axios.get('/users');
};

export const addUserArticle = (articleId) => {
  return Axios.post(`/users/addArticle`, { _id: articleId });
};

export const getUserArticles = () => {
  return Axios.get(`/users/getArticles`);
};