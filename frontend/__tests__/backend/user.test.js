import { mockFirebase, FakeFirestore } from 'firestore-jest-mock';
import {
  mockGet,
  mockGetTransaction,
  mockSet,
  mockSetTransaction
} from 'firestore-jest-mock/mocks/firestore';

const userId = 'orbitinder@devs.com';
const data = {
  id: 'orbitinder@devs.com',
  name: 'OrbiTinder Devs',
  background: {
    achievement: 'Artemis',
    biography: 'For Testing db methods',
    commitment: 'High Commitment',
    degree: 'Computer Science'
  },
  preferences: {
    commitment: ['High Commitment', 'Medium Commitment'],
    degree: ['Business Analytics', 'Computer Science']
  }
};

describe('Initialising mock users data', () => {
  mockFirebase({
    database: {
      users: [
        { id: 'orbitinder@devs.com', name: 'OrbiTinder Devs' },
        { id: 'dom@lim.com', name: 'Dominic Lim' }
      ],
      usersData: [
        {
          id: 'orbitinder@devs.com',
          name: 'OrbiTinder Devs',
          background: {
            achievement: 'Artemis',
            biography: 'For Testing db methods',
            commitment: 'High Commitment',
            degree: 'Computer Science'
          },
          preferences: {
            commitment: ['High Commitment', 'Medium Commitment'],
            degree: ['Business Analytics', 'Computer Science']
          }
        },
        {
          id: 'dom@lim.com',
          name: 'OrbiTinder Devs',
          background: {
            achievement: 'Artemis',
            biography: 'For Testing db methods',
            commitment: 'High Commitment',
            degree: 'Computer Science'
          },
          preferences: {
            commitment: ['High Commitment', 'Medium Commitment'],
            degree: ['Business Analytics', 'Computer Science']
          }
        }
      ]
    }
  });
});

describe('[user.js] getUserData (Retrieve)', () => {
  test('Testing getUserData', async () => {
    expect(mockGetTransaction).not.toHaveBeenCalled();
    const firebase = require('firebase');
    const db = firebase.firestore();
    const ref = db.collection('users').doc(userId);

    await db.runTransaction(async transaction => {
      const result = transaction.get(ref);
      expect(result).toBeInstanceOf(Promise);
      const doc = await result;

      expect(mockGet).not.toHaveBeenCalled();
      expect(doc).toHaveProperty('id', userId);
    });
    expect(mockGetTransaction).toHaveBeenCalled();
  });
});

describe('[user.js] addProfile (Create)', () => {
  test('Testing addProfile', async () => {
    expect(mockSetTransaction).not.toHaveBeenCalled();
    const firebase = require('firebase');
    const db = firebase.firestore();
    const ref = db.collection('users').doc(userId);

    await db.runTransaction(transaction => {
      const options = { merge: true };
      const result = transaction.set(ref, data.background, options);

      expect(result).toBeInstanceOf(FakeFirestore.Transaction);
      expect(mockSet).toHaveBeenCalledWith(data.background, options);
    });
    expect(mockSetTransaction).toHaveBeenCalled();
  });
});

describe('[user.js] addPreferences (Update)', () => {
  test('Testing addPreferences', async () => {
    const firebase = require('firebase');
    const db = firebase.firestore();
    const ref = db.collection('users').doc(userId);

    await db.runTransaction(transaction => {
      const options = { merge: true };
      const result = transaction.set(ref, data.preferences, options);

      expect(result).toBeInstanceOf(FakeFirestore.Transaction);
      expect(mockSet).toHaveBeenCalledWith(data.preferences, options);
    });
    expect(mockSetTransaction).toHaveBeenCalled();
  });
});
