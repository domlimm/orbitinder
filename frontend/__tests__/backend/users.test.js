import { mockFirebase } from 'firestore-jest-mock';
import {
  mockGetAll,
  mockGetAllTransaction
} from 'firestore-jest-mock/mocks/firestore';

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

describe('[user.js] getAllUserData (Retrieve)', () => {
  test('Testing getAllUserData', async () => {
    expect.assertions(3);
    const firebase = require('firebase');
    const db = firebase.firestore();
    const ref1 = db.collection('users');

    await db.runTransaction(async transaction => {
      const result = await transaction.getAll(ref1);

      expect(result).toBeInstanceOf(Array);
      expect(mockGetAll).toHaveBeenCalled();
    });
    expect(mockGetAllTransaction).toHaveBeenCalled();
  });
});
