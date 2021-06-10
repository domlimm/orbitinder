import firebase from '../../firebase';

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';
export const ADD_USER_PREFERENCES = 'ADD_USER_PREFERENCES';
export const GET_USER_DATA = 'GET_USER_DATA';
export const CLEAR_LOG_OUT = 'CLEAR_LOG_OUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

const db = firebase.firestore();

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

export const addProfile = data => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  setProfilePhoto(data.imagePath).then(imagePath => {
    const updatedData = { ...data, imagePath: imagePath };

    db.collection('users')
      .doc(userId)
      .set(updatedData)
      .then(() => {
        dispatch({
          type: ADD_USER_PROFILE,
          userData: updatedData
        });
      })
      .catch(err => {
        throw new Error(`Adding Profile: ${err}`);
      });
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

export const setProfilePhoto = async uri => {
  const userId = firebase.auth().currentUser.uid;
  const metadata = {
    contentType: 'image/jpeg'
  };
  const photoName = 'profilePhoto.jpg';

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = e => {
      console.log(`Add Profile Photo: ${e}`);
      reject(new TypeError('Network request failed'));
    };

    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const storageRef = firebase
    .storage()
    .ref()
    .child(`/users/${userId}/${photoName}`);
  const snapshot = await storageRef.put(blob, metadata);

  blob.close();

  return await snapshot.ref.getDownloadURL();
};

export const updatePref = data => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .set(data, { merge: true })
    .then(() => {
      dispatch({ type: UPDATE_PREFERENCES, userData: data });
    })
    .catch(err => {
      throw new Error(`Updating Preferences: ${err}`);
    });
};

export const updateProfile = data => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  if (data.imagePath !== null) {
    setProfilePhoto(data.imagePath).then(imagePath => {
      const updatedData = { ...data, imagePath: imagePath };

      db.collection('users')
        .doc(userId)
        .set(updatedData, { merge: true })
        .then(() => {
          dispatch({ type: UPDATE_PROFILE, userData: updatedData });
        })
        .catch(err => {
          throw new Error(`Updating Profile: ${err}`);
        });
    });
  }
};

export const clearDataLogOut = () => dispatch => {
  try {
    dispatch({ type: CLEAR_LOG_OUT });
  } catch (err) {
    throw new Error(`Clear Data: ${err}`);
  }
};
