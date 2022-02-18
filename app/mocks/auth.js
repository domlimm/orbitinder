const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockVerifyIdToken = jest.fn();
const mockGetUser = jest.fn();
const mockSignOut = jest.fn();

class FakeAuth {
  constructor(currentUser = {}) {
    this.currentUserRecord = currentUser;
  }

  createUserWithEmailAndPassword() {
    mockCreateUserWithEmailAndPassword(...arguments);
    return Promise.resolve({ user: this.currentUserRecord });
  }

  signInWithEmailAndPassword() {
    mockSignInWithEmailAndPassword(...arguments);
    return Promise.resolve({ user: this.currentUserRecord });
  }

  signOut() {
    mockSignOut();
    return Promise.resolve('👍');
  }

  verifyIdToken() {
    mockVerifyIdToken(...arguments);
    return Promise.resolve(this.currentUserRecord);
  }

  getUser() {
    return Promise.resolve(mockGetUser(...arguments) || {});
  }

  get currentUser() {
    const { uid, ...data } = this.currentUser;
    return { uid, data };
  }
}

module.exports = {
  FakeAuth,
  mockCreateUserWithEmailAndPassword,
  mockSignInWithEmailAndPassword,
  mockSignOut,
  mockVerifyIdToken,
  mockGetUser
};
