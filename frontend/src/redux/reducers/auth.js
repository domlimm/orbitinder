import { GET_USER } from '../constants/index';

const initialState = {
  name: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        name: action.user
      };
    default:
      return state;
  }
};
