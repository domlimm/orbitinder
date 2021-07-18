import { mockFirebase } from 'firestore-jest-mock';
import {
  mockCreateUserWithEmailAndPassword,
  mockSignInWithEmailAndPassword,
  mockSignOut
} from '../../mocks/auth';

describe('[auth.js] Auth Operations', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    this.firebase = require('firebase');
    this.firebase.initializeApp({
      apiKey: 'AIzaSyCgLJ-OgQo97_uL8vUctptQiB1krjST7GM',
      authDomain: 'orbitinder-45e68.firebaseapp.com',
      projectId: 'orbitinder-45e68'
    });
  });

  // 'a@a.com', '123456'
  describe('Testing auth.js', () => {
    describe('[auth.js] functions', () => {
      test('signUp', async () => {
        await this.firebase
          .auth()
          .createUserWithEmailAndPassword('a@a.com', '123456')
          .then(() => {
            expect(mockCreateUserWithEmailAndPassword);
          });
      });

      test('logIn', async () => {
        await this.firebase
          .auth()
          .signInWithEmailAndPassword('a@a.com', '123456')
          .then(() => {
            expect(mockSignInWithEmailAndPassword);
          });
      });

      test('logOut', async () => {
        await this.firebase
          .auth()
          .signOut()
          .then(() => {
            expect(mockSignOut);
          });
      });
    });
  });
});
