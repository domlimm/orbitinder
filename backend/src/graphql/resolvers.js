const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    info: () => "Let's go OrbiTinder!",
    getUser: () => {
      // context contains db object (mongoDB)
      return user;
    }
  },
  Mutation: {
    signUp: async (_, { input }, { db }) => {
      const hashedPassword = bcrypt.hashSync(input.password);
      const userInput = {
        ...input,
        password: hashedPassword
      };

      const result = await db.collection('Users').insertOne(userInput);
      const user = result.ops[0];

      return {
        user,
        token: 'tempToken'
      };
    },
    logIn: async (_, { input }, { db }) => {
      const user = await db.collection('Users').findOne({ email: input.email });
      const passwordCorrect =
        user && bcrypt.compareSync(input.password, user.password);

      if (!user || !passwordCorrect) {
        throw new Error('Invalid Credentials!');
      }

      return { user, token: 'tempToken' };
    }
  },
  User: {
    // root is the value of User, comes from db
    // or `id: ({ _id, id }) => _id || id`
    id: root => root._id
  }
};

module.exports = resolvers;
