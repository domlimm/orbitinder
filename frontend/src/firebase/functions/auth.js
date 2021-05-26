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
          const name = signUpResponse.displayName;

          console.log('signUp', name);

          return name;
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
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      const name = res.user.displayName;

      console.log('logIn', name);

      return name;
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
