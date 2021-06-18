import firebase from '../../firebase';

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';
export const ADD_USER_PREFERENCES = 'ADD_USER_PREFERENCES';
export const GET_USER_DATA = 'GET_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';
export const REMOVE_PROFILE_PHOTO = 'REMOVE_PROFILE_PHOTO';
export const UPDATE_LATE_CHAT_MSG = 'UPDATE_LATE_CHAT_MSG';

const db = firebase.firestore();

export const getUserData = () => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .get()
    .then(res => {
      const userData = { id: userId, ...res.data() };
      const chatIds = userData.chats;
      let chatsLatestMessage = [];

      chatIds.map(id => {
        db.collection('chats')
          .doc(id)
          .get()
          .then(res => {
            chatsLatestMessage.push(res.data());
          });
      });

      dispatch({
        type: GET_USER_DATA,
        userData: { ...userData, chatsLatestMessage: chatsLatestMessage }
      });
    })
    .catch(err => {
      throw new Error(`Get User Data: ${err}`);
    });
};

export const addProfile = (data, updateImage) => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  if (updateImage) {
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
          throw new Error(`Adding Profile (Image): ${err}`);
        });
    });
  } else {
    db.collection('users')
      .doc(userId)
      .set(data)
      .then(() => {
        dispatch({
          type: ADD_USER_PROFILE,
          userData: data
        });
      })
      .catch(err => {
        throw new Error(`Adding Profile: ${err}`);
      });
  }
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

export const updateProfile = (data, updateImage) => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  if (updateImage) {
    setProfilePhoto(data.imagePath).then(imagePath => {
      const updatedData = { ...data, imagePath: imagePath };

      db.collection('users')
        .doc(userId)
        .set(updatedData, { merge: true })
        .then(() => {
          dispatch({ type: UPDATE_PROFILE, userData: updatedData });
        })
        .catch(err => {
          throw new Error(`Updating Profile (Image): ${err}`);
        });
    });
  } else {
    db.collection('users')
      .doc(userId)
      .set(data, { merge: true })
      .then(() => {
        dispatch({ type: UPDATE_PROFILE, userData: data });
      })
      .catch(err => {
        throw new Error(`Updating Profile: ${err}`);
      });
  }
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
      console.log(`Set Profile Photo: ${e}`);
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

export const removeProfilePhoto = () => dispatch => {
  const userId = firebase.auth().currentUser.uid;
  const data = { imagePath: '', updatedAt: new Date().toISOString() };

  db.collection('users')
    .doc(userId)
    .set(data, { merge: true })
    .then(() => {
      dispatch({
        type: REMOVE_PROFILE_PHOTO,
        userData: data
      });
    })
    .catch(err => {
      throw new Error(`Remove Profile Photo: ${err}`);
    });
};

export const getLatestChatMessage = userData => dispatch => {
  try {
    // const chatsLatestMessage = userData.chatsLatestMessage.map(latest =>
    //   latest.chatId === chatId
    //     ? { ...latest, latestMessage: latestMessage }
    //     : latest
    // );

    const chatIds = userData.chats;
    let chatsLatestMessage = [];

    chatIds.map(id => {
      db.collection('chats')
        .doc(id)
        .get()
        .then(res => {
          chatsLatestMessage.push(res.data());
        });
    });

    console.log(chatsLatestMessage);

    dispatch({
      type: UPDATE_LATE_CHAT_MSG,
      chatsLatestMessage: chatsLatestMessage
    });
  } catch (err) {
    throw new Error(`Update Latest Chat Msg: ${err}`);
  }
};

export const logOut = () => dispatch => {
  try {
    dispatch({ type: LOG_OUT });
  } catch (err) {
    throw new Error(`Clear User Data: ${err}`);
  }
};
