import { USER_LOGIN } from '../actions'
const user = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.data
      }
    default:
      return state
  }
}

export default user;
