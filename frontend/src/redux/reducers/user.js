import { ADD_USER_PROFILE, ADD_USER_PREFERENCES } from '../actions/user';

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
    case ADD_USER_PREFERENCES:
      return {
        ...state,
        userData: action.preferenceData
      };
    default:
      return state;
  }
};
