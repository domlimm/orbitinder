import firebase from '../../firebase';

const db = firebase.firestore();

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';

export const addProfile = data => dispatch => {
  console.log('addProfile passed', data);

  const userId = firebase.auth().currentUser.uid;

  console.log(userId);

  db.collection('users')
    .doc(userId)
    .set(data)
    .then(res => {
      console.log('addProfile', res);

      dispatch({ type: ADD_USER_PROFILE, userData: data });
    })
    .catch(err => {
      throw new Error(`Creating Profile: ${err}`);
    });
};
