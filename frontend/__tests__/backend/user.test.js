import { mockCollection } from 'firestore-jest-mock/mocks/firestore';
import { mockFirebase } from 'firestore-jest-mock';
import { mockSet } from 'firestore-jest-mock/mocks/firestore';

const userId = 'orbitinder@devs.com';
const data = {
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

describe('[user.js] getUserData', () => {
  test('Testing getUserData', () => {
    const firebase = require('firebase');
    const db = firebase.firestore();

    return db
      .collection('users')
      .get()
      .then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('users');
      });
  });
});

describe('[user.js] addProfile', () => {
  test('Testing getUserData', () => {
    const firebase = require('firebase');
    const db = firebase.firestore();

    return db
      .collection('users')
      .doc(userId)
      .set(data)
      .then(() => {
        expect(mockCollection).toHaveBeenCalledWith('users');
      });
  });
});
