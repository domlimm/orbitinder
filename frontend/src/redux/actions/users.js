import firebase from '../../firebase';

export const GET_ALL_USER_DATA = 'GET_ALL_USER_DATA';

const db = firebase.firestore();

export const getAllUserData = () => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  // db.collection('users')
  //   .get()
  //   .then(snapshot => {
  //     console.log(snapshot.docs);
  //     dispatch({ type: GET_ALL_USER_DATA, allUserData: snapshot.docs });
  //     // snapshot.docs.forEach(doc => {

  //     // })
  //     // console.log('res', res);
  //     // dispatch({ type: GET_ALL_USER_DATA, allUserData: [res.data()] });
  //   })
  //   .catch(err => {
  //     throw new Error(`Get All User Data: ${err}`);
  //   });
  db.collection('users')
    .doc(userId)
    .get()
    .then(res => {
      // console.log('snapshot', snapshot);
      dispatch({ type: GET_ALL_USER_DATA, userData: res.data() });
    })
    .catch(err => {
      throw new Error(`Get User Data: ${err}`);
    });
};
