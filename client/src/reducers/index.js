import { USER_LOGIN, USER_LOGOUT } from '../actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.data,
        articles: action.articles
      };
    case USER_LOGOUT:
      return {};
    default:
      return state
  }
}

export default user;
