import { GET_ALL_USER_DATA, LOG_OUT } from '../actions/users';

const initialState = {
  userData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_DATA:
      return {
        userData: action.userData
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
