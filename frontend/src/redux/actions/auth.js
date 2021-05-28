import firebase from '../../firebase';

export const GET_USER_NAME = 'GET_USER_NAME';

export const signUp = (email, password, name) => dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
    .then(res => {
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: name })
        .then(() => {
          dispatch({
            type: GET_USER_NAME,
            id: res.user.uid,
            user: res.user.displayName
          });
        })
        .catch(err => console.log('err.message', err.message));
    })
    .catch(err => {
      let message = 'actions.signUp: An error has occured!';
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

export const logIn = (email, password) => dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      dispatch({
        type: GET_USER_NAME,
        id: res.user.uid,
        user: res.user.displayName
      });
    })
    .catch(err => {
      let message = 'actions.logIn: An error has occured!';
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

export const setCurrentUser = currentUserName => dispatch => {
  try {
    dispatch({
      type: GET_USER_NAME,
      user: currentUserName
    });
  } catch (error) {
    throw new Error(error);
  }
};
