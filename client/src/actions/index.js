export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (payload, articles) => {
  return {
    type: USER_LOGIN,
    data: payload,
    articles
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  }
}