import ENV from '../../env';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/storage';

if (firebase.apps.length === 0) {
  firebase.initializeApp(ENV().firebaseConfig);
}

export default firebase;
