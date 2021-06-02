import firebase from '../../firebase';

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';
export const ADD_USER_PREFERENCES = 'ADD_USER_PREFERENCES';
export const GET_USER_DATA = 'GET_USER_DATA';
export const CLEAR_LOG_OUT = 'CLEAR_LOG_OUT';

const db = firebase.firestore();

export const addProfile = data => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .set(data)
    .then(() => {
      dispatch({ type: ADD_USER_PROFILE, userData: data });
    })
    .catch(err => {
      throw new Error(`Adding Profile: ${err}`);
    });
};

export const addPreferences = data => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .set(data, { merge: true })
    .then(() => {
      dispatch({ type: ADD_USER_PREFERENCES, userData: data });
    })
    .catch(err => {
      throw new Error(`Adding Preferences: ${err}`);
    });
};

export const clearDataLogOut = () => dispatch => {
  try {
    dispatch({ type: CLEAR_LOG_OUT });
  } catch (err) {
    throw new Error(`Clear Data: ${err}`);
  }
};

export const getUserData = () => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .get()
    .then(res => {
      dispatch({ type: GET_USER_DATA, userData: res.data() });
    })
    .catch(err => {
      throw new Error(`Get User Data: ${err}`);
    });
};
