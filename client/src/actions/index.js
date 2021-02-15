export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    data: payload
  }
}