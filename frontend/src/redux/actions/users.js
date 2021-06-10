import firebase from '../../firebase';

export const GET_ALL_USER_DATA = 'GET_ALL_USER_DATA';
export const LOG_OUT = 'LOG_OUT';

const db = firebase.firestore();

export const getAllUserData = () => dispatch => {
  const currentUserId = firebase.auth().currentUser.uid;

  db.collection('users')
    .get()
    .then(snapshot => {
      let userData = [];

      snapshot.forEach(doc => {
        if (currentUserId !== doc.id) {
          let user = { id: doc.id, ...doc.data() };

          userData.push(user);
        }
      });

      dispatch({ type: GET_ALL_USER_DATA, userData: userData });
    })
    .catch(err => {
      throw new Error(`Get all Users Data: ${err}`);
    });
};

export const logOut = () => dispatch => {
  try {
    dispatch({ type: LOG_OUT });
  } catch (err) {
    throw new Error(`Clear Users Data: ${err}`);
  }
};
