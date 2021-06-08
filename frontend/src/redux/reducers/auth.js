import { STORE_USER_DATA, SET_REGISTER, LOG_OUT } from '../actions/auth';

const initialState = {
  id: '',
  name: '',
  isRegistering: false,
  gender: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_DATA:
      return {
        ...state,
        id: action.id,
        name: action.user
      };
    case SET_REGISTER:
      return {
        ...state,
        isRegistering: action.isRegistering,
        gender: action.gender
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
