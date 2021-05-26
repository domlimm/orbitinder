import { GET_USER_NAME } from '../actions/auth';

const initialState = {
  name: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NAME:
      return {
        ...state,
        name: action.user
      };
    default:
      return state;
  }
};
