import { GET_ALL_USER_DATA, LOG_OUT } from '../actions/users';

const initialState = {
  usersData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_DATA:
      return {
        usersData: action.usersData
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
