import ENV from '../../../env';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/storage';
require('firebase/firestore');

if (firebase.apps.length === 0) {
  console.log('init firebase success');

  firebase.initializeApp(ENV().firebaseConfig);
}

export default firebase;
