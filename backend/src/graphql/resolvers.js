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
    logIn: async (_, data) => {}
  },
  User: {
    // root is the value of User, comes from db
    // or `id: ({ _id, id }) => _id || id`
    id: root => root._id
  }
};

module.exports = resolvers;
