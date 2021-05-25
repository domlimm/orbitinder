import firebase from '../../api/firebase';

const db = firebase.firestore();

export const signUp = (email, password, name) => {
  console.log(email, password, name);
  let signUpResponse;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });

  // return async dispatch => {
  //   await firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
  //     .then(res => {
  //       console.log(res);
  //       console.log('signUpResponse');
  //       signUpResponse = res.user;
  //       console.log(signUpResponse);

  //       const currentUser = firebase.auth().currentUser;
  //       console.log(currentUser);

  //       firebase
  //         .auth()
  //         .currentUser.updateProfile({ displayName: name })
  //         .then(() => {
  //           console.log('.currentUser.updateProfile');
  //           dispatch({ type: GET_USER, user: signUpResponse.displayName });
  //         })
  //         .catch(err => console.log('err.message', err.message));
  //     })
  //     .catch(err => {
  //       let message = 'An error has occured!';

  //       let errorPresent =
  //         err.code === 'auth/email-already-in-use' ||
  //         err.code === 'auth/invalid-email' ||
  //         err.code === 'auth/weak-password';

  //       if (errorPresent) {
  //         message = 'Invalid Credentials!';
  //       }

  //       throw new Error(message);
  //     });
  // };
};
