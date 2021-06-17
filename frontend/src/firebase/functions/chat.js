import firebase from '../index';

const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;

export const sendMessage = data => {
  db.collection('chats')
    .doc(`${currentUser.uid}-${data.otherUserId}`)
    .collection('messages')
    .add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: data.message,
      name: currentUser.displayName
      // image: might have to add image of user sending msg if app scales
    });
};

export const getMessages = chatId => {
  db.collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => snapshot);
};
