import {
  ADD_USER_PROFILE,
  ADD_USER_PREFERENCES,
  GET_USER_DATA,
  LOG_OUT,
  UPDATE_PROFILE,
  UPDATE_PREFERENCES,
  REMOVE_PROFILE_PHOTO,
  UPDATE_LATE_CHAT_MSG,
  ADD_LIKES,
  ADD_DISLIKES,
  ADD_LIKED_BY,
  REMOVE_LIKED_BY,
  ACCEPT_CHAT_REQUEST,
  REMOVE_RECOMMENDED_USERS
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
    case ADD_LIKES:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: [...state.userData.likes, action.likeUserId],
          recentLikes: [
            ...state.userData.recentLikes,
            { id: action.likeUserId, timestamp: action.timestamp }
          ]
        }
      };
    case ADD_DISLIKES:
      return {
        ...state,
        userData: {
          ...state.userData,
          dislikes: [...state.userData.dislikes, action.dislikeUserId]
        }
      };
    case ADD_LIKED_BY:
      return {
        ...state,
        userData: {
          ...state.userData,
          likedBy: [...state.userData.likedBy, action.id]
        }
      };
    case REMOVE_LIKED_BY:
      return {
        ...state,
        userData: {
          ...state.userData,
          likedBy: state.userData.likedBy.filter(id => id !== action.id)
        }
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
    case UPDATE_LATE_CHAT_MSG:
      return {
        ...state,
        userData: {
          ...state.userData,
          chatsLatestMessage: action.chatsLatestMessage
        }
      };
    case ACCEPT_CHAT_REQUEST:
      return {
        ...state,
        userData: {
          ...state.userData,
          chats: [...state.userData.chats, action.chatId]
        }
      };
    case REMOVE_RECOMMENDED_USERS:
      return {
        ...state,
        userData: {
          ...state.userData,
          recommended_users: state.userData.recommended_users.filter(
            id => id !== action.id
          )
        }
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
