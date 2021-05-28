import firebase from '../index';

const db = firebase.firestore();

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';

export const addProfile = data => dispatch => {
  console.log(data);

  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .set(data)
    .then(res => {
      console.log(res);

      // dispatch({type: ADD_USER_PROFILE, userData: })
    })
    .catch(err => {
      throw new Error(`Creating Profile: ${err}`);
    });
};
