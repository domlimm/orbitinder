import firebase from '../../firebase';

const db = firebase.firestore();

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';

export const addProfile = data => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .set(data)
    .then(() => {
      dispatch({ type: ADD_USER_PROFILE, userData: data });
    })
    .catch(err => {
      throw new Error(`Creating Profile: ${err}`);
    });
};
