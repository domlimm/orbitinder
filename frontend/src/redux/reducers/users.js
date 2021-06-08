import { GET_ALL_USER_DATA } from '../actions/users';

const initialState = {
  userData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_DATA:
      return {
        userData: action.userData
      };
    default:
      return state;
  }
};
