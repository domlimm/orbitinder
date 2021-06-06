import firebase from '../../firebase';

export const STORE_USER_DATA = 'STORE_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const SET_REGISTER = 'SET_REGISTER';

export const signUp = (email, password, name, gender) => async dispatch => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
    .then(res => {
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: name })
        .then(() => {
          dispatch({
            type: STORE_USER_DATA,
            id: res.user.uid,
            user: res.user.displayName
          });
          dispatch({
            type: SET_REGISTER,
            isRegistering: true,
            gender: gender
          });
        })
        .catch(err => console.log('err.message', err.message));
    })
    .catch(err => {
      let message = 'An error has occured!';
      let hasError =
        err.code === 'auth/email-already-in-use' ||
        err.code === 'auth/invalid-email' ||
        err.code === 'auth/weak-password';

      if (hasError) {
        message = 'Invalid Credentials!';
      }

      throw new Error(message);
    });
};

export const logIn = (email, password) => async dispatch => {
  return await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      dispatch({
        type: STORE_USER_DATA,
        id: res.user.uid,
        user: res.user.displayName
      });
      dispatch({
        type: SET_REGISTER,
        isRegistering: false
      });
    })
    .catch(err => {
      let message = 'An error has occured!';
      let hasError =
        err.code === 'auth/invalid-email' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found';

      if (hasError) {
        message = 'Invalid Credentials!';
      }

      throw new Error(message);
    });
};

export const completeRegister = complete => dispatch => {
  dispatch({ type: SET_REGISTER, isRegistering: complete });
};

export const logOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: LOG_OUT });
    })
    .catch(err => new Error(err));
};

export const setCurrentUser = (id, name, isRegistering) => dispatch => {
  try {
    dispatch({
      type: STORE_USER_DATA,
      id: id,
      user: name,
      isRegistering: isRegistering
    });
  } catch (error) {
    throw new Error(error);
  }
};
