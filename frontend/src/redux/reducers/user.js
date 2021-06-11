import {
  ADD_USER_PROFILE,
  ADD_USER_PREFERENCES,
  GET_USER_DATA,
  LOG_OUT,
  UPDATE_PROFILE,
  UPDATE_PREFERENCES,
  REMOVE_PROFILE_PHOTO
} from '../actions/user';

const initialState = {
  userData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PREFERENCES:
      return {
        ...state,
        userData: { ...state.userData, ...action.userData }
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        userData: { ...state.userData, ...action.userData }
      };
    case ADD_USER_PROFILE:
      return {
        ...state,
        userData: { ...state.userData, ...action.userData }
      };
    case ADD_USER_PREFERENCES:
      return {
        ...state,
        userData: { ...state.userData, ...action.userData }
      };
    case GET_USER_DATA:
      return {
        userData: action.userData
      };
    case REMOVE_PROFILE_PHOTO:
      return {
        ...state,
        userData: { ...state.userData, ...action.userData }
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
