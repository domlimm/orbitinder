import { ADD_USER_PROFILE } from '../actions/user';

const initialState = {
  userData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_PROFILE:
      return {
        ...state,
        userData: action.userData
      };
    default:
      return state;
  }
};
