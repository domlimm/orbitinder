import firebase from '../index';

export const signUp = (email, password, name) => {
  let signUpResponse;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
    .then(res => {
      signUpResponse = res.user;

      firebase
        .auth()
        .currentUser.updateProfile({ displayName: name })
        .then(() => {
          console.log(signUpResponse.displayName);

          return signUpResponse.displayName;
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

export const logIn = (email, password) => {
  let logInResponse;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      logInResponse = res;
      console.log(logInResponse);
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
