import firebase from '../../firebase';

import * as usersActions from './users';

export const ADD_USER_PROFILE = 'ADD_USER_PROFILE';
export const ADD_USER_PREFERENCES = 'ADD_USER_PREFERENCES';
export const GET_USER_DATA = 'GET_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';
export const REMOVE_PROFILE_PHOTO = 'REMOVE_PROFILE_PHOTO';
export const UPDATE_LATE_CHAT_MSG = 'UPDATE_LATE_CHAT_MSG';
export const ADD_LIKES = 'ADD_LIKES';
export const ADD_DISLIKES = 'ADD_DISLIKES';
export const ADD_LIKED_BY = 'ADD_LIKED_BY';
export const REMOVE_LIKED_BY = 'REMOVE_LIKED_BY';
export const ACCEPT_CHAT_REQUEST = 'ACCEPT_CHAT_REQUEST';

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

      if (chatIds !== undefined) {
        chatIds.map(id => {
          db.collection('chats')
            .doc(id)
            .get()
            .then(res => {
              chatsLatestMessage.push(res.data());
            });
        });
      }

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

export const addLikes = likeUserId => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(likeUserId),
      recentLikes: firebase.firestore.FieldValue.arrayUnion({
        id: likeUserId,
        timestamp: new Date().toISOString()
      })
    })
    .then(() => {
      dispatch({
        type: ADD_LIKES,
        likeUserId: likeUserId,
        timestamp: new Date().toISOString()
      });
    })
    .catch(err => {
      throw new Error(`Adding Likes: ${err}`);
    });
};

export const addDislikes = dislikeUserId => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .update({
      dislikes: firebase.firestore.FieldValue.arrayUnion(dislikeUserId)
    })
    .then(() => {
      dispatch({ type: ADD_DISLIKES, dislikeUserId: dislikeUserId });
    })
    .catch(err => {
      throw new Error(`Adding Dislikes: ${err}`);
    });
};

export const addLikedBy = (receiverData, senderData) => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(receiverData.id)
    .update({ likedBy: firebase.firestore.FieldValue.arrayUnion(userId) })
    .then(() => {
      dispatch({ type: ADD_LIKED_BY, id: userId });

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip,deflate',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: receiverData.userPushToken,
          title: `${senderData.name} has swiped right on you!`,
          body: 'Click here for more information on it.',
          data: {
            screen: 'RequestsOverview'
          }
        })
      });
    })
    .catch(err => {
      throw new Error(`Add Liked By: ${err}`);
    });
};

export const addAcceptChatRequest =
  (senderId, receiverData, senderData) => dispatch => {
    const userId = firebase.auth().currentUser.uid;

    db.collection('chats')
      .add({
        chatId: '',
        participants: [
          {
            id: userId,
            name: receiverData.name,
            imagePath: receiverData.imagePath
          },
          {
            id: senderId,
            name: senderData.name,
            imagePath: senderData.imagePath
          }
        ]
      })
      .then(docReference => {
        const docId = docReference.id;

        docReference
          .set({ chatId: docId }, { merge: true })
          .then(() => {
            db.collection('users')
              .doc(userId)
              .update({
                chats: firebase.firestore.FieldValue.arrayUnion(docId)
              })
              .then(() => {
                dispatch({ type: ACCEPT_CHAT_REQUEST, chatId: docId });
              })
              .catch(err => {
                throw new Error(`Update User's Chats: ${err}`);
              });

            db.collection('users')
              .doc(senderId)
              .update({
                chats: firebase.firestore.FieldValue.arrayUnion(docId)
              })
              .then(() => {
                fetch('https://exp.host/--/api/v2/push/send', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Accept-Encoding': 'gzip,deflate',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    to: senderData.userPushToken,
                    title: `${receiverData.name} has accepted your chat request!`,
                    body: 'Click here for more information on it.',
                    data: {
                      screen: 'ChatsOverview'
                    }
                  })
                });
              })
              .catch(err => {
                throw new Error(`Update Sender's Chats: ${err}`);
              });
          })
          .catch(err => {
            throw new Error(`Update Chat Room: ${err}`);
          });
      })
      .catch(err => {
        throw new Error(`Add Chat Room: ${err}`);
      });
  };

export const rejectChatRequest = senderId => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(senderId)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(userId),
      dislikes: firebase.firestore.FieldValue.arrayUnion(userId)
    })
    .then(() => {
      db.collection('users')
        .doc(userId)
        .update({
          dislikes: firebase.firestore.FieldValue.arrayUnion(senderId)
        })
        .then(() => {
          dispatch(usersActions.getAllUserData());
        })
        .catch(err => {
          throw new Error(`Reject Chat Req (Update receiver): ${err}`);
        });
    })
    .catch(err => {
      throw new Error(`Reject Chat Req (Update sender): ${err}`);
    });
};

export const removeLikedBy = removeId => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .update({ likedBy: firebase.firestore.FieldValue.arrayRemove(removeId) })
    .then(() => {
      dispatch({ type: REMOVE_LIKED_BY, id: removeId });
    })
    .catch(err => {
      throw new Error(`Add Liked By: ${err}`);
    });
};

export const cancelRequest = (receiverId, newRecentLikes) => dispatch => {
  const userId = firebase.auth().currentUser.uid;
  const usersRef = db.collection('users');

  // Remove from current user's recentLikes when matched

  usersRef
    .doc(userId)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(receiverId),
      recentLikes: newRecentLikes
    })
    .then(() => {
      usersRef
        .doc(receiverId)
        .update({
          likedBy: firebase.firestore.FieldValue.arrayRemove(userId)
        })
        .then(() => {
          dispatch();
          dispatch(usersActions.getAllUserData());
          dispatch(getUserData());
        })
        .catch(err => {
          throw new Error(`Cancel Request (Update receiver (likedBy)): ${err}`);
        });
    })
    .catch(err => {
      throw new Error(`Cancel Request (Update current user): ${err}`);
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

export const updateLatestChatMessage =
  (userData, chatId, latestMessage) => dispatch => {
    try {
      const chatsLatestMessage = userData.chatsLatestMessage.map(latest =>
        latest.chatId === chatId
          ? { ...latest, latestMessage: latestMessage }
          : latest
      );

      dispatch({
        type: UPDATE_LATE_CHAT_MSG,
        chatsLatestMessage: chatsLatestMessage
      });
    } catch (err) {
      throw new Error(`Update Latest Chat Msg: ${err}`);
    }
  };

export const updateMatched = peerData => dispatch => {
  const currentUser = firebase.auth().currentUser;

  db.collection('users')
    .doc(peerData.id)
    .set({ matched: true, matching: true }, { merge: true })
    .then(() => {
      db.collection('users')
        .doc(currentUser.uid)
        .set({ matched: false, matching: false }, { merge: true })
        .then(() => {
          dispatch(usersActions.getAllUserData());
          dispatch(getUserData());

          fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-Encoding': 'gzip,deflate',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to: peerData.userPushToken,
              title: `${currentUser.displayName} wants to be your teammate!`,
              body: 'Click here for more information on it.',
              data: {
                screen: 'ChatsOverview'
              }
            })
          });
        })
        .catch(err => {
          throw new Error(`Update Matched (Current): ${err}`);
        });
    })
    .catch(err => {
      throw new Error(`Update Matched (Peer): ${err}`);
    });
};

export const reconsiderMatched = peerId => dispatch => {
  const userId = firebase.auth().currentUser.uid;
  const updateIds = [userId, peerId];
  const batch = db.batch();

  db.collection('users')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (updateIds.includes(doc.id)) {
          const docRef = db.collection('users').doc(doc.id);
          batch.update(docRef, { matched: false, matching: false });
        }
      });

      batch
        .commit()
        .then(() => {
          dispatch(usersActions.getAllUserData());
          dispatch(getUserData());
        })
        .catch(err => {
          throw new Error(`Confirm Match (batch): ${err}`);
        });
    })
    .catch(err => {
      throw new Error(`Confirm Matched: ${err}`);
    });
};

export const confirmMatched = peerData => dispatch => {
  const currentUser = firebase.auth().currentUser;
  const batch = db.batch();

  db.collection('users')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.id === currentUser.uid) {
          const docRef = db.collection('users').doc(doc.id);
          batch.update(docRef, {
            matchId: peerData.id,
            matched: true,
            matching: false
          });
        } else if (doc.id === peerData.id) {
          const docRef = db.collection('users').doc(doc.id);
          batch.update(docRef, {
            matchId: currentUser.uid,
            matched: true,
            matching: false
          });
        }
      });

      batch
        .commit()
        .then(() => {
          dispatch(usersActions.getAllUserData());
          dispatch(getUserData());

          fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-Encoding': 'gzip,deflate',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to: peerData.userPushToken,
              title: `${currentUser.displayName} has accepted your partnership request!`,
              body: 'Click here for more information on it.',
              data: {
                screen: 'ChatsOverview'
              }
            })
          });
        })
        .catch(err => {
          throw new Error(`Confirm Match (batch): ${err}`);
        });
    })
    .catch(err => {
      throw new Error(`Confirm Matched: ${err}`);
    });
};

export const updateMatching = status => dispatch => {
  const userId = firebase.auth().currentUser.uid;

  db.collection('users')
    .doc(userId)
    .set({ matching: status }, { merge: true })
    .then(() => {
      dispatch(usersActions.getAllUserData());
      dispatch(getUserData());
    })
    .catch(err => {
      throw new Error(`Update Matching status: ${err}`);
    });
};

export const logOut = () => dispatch => {
  try {
    dispatch({ type: LOG_OUT });
  } catch (err) {
    throw new Error(`Clear User Data: ${err}`);
  }
};
