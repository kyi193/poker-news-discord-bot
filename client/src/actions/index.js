export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (payload, articles) => {
  return {
    type: USER_LOGIN,
    data: payload,
    articles
  }
}