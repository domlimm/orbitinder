const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { JWT_SECRET } = process.env;

const getToken = user =>
  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 360 * 24 });

const getUserUsingToken = async (token, db) => {
  if (!token) return null;

  const tokenData = jwt.verify(token, JWT_SECRET);
  if (!tokenData?.id) return null;

  return await db.collection('Users').findOne({ _id: ObjectID(tokenData.id) });
};

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

      return { user, token: getToken(user) };
    },
    logIn: async (_, { input }, { db }) => {
      const user = await db.collection('Users').findOne({ email: input.email });
      const passwordCorrect =
        user && bcrypt.compareSync(input.password, user.password);

      if (!user || !passwordCorrect) {
        throw new Error('Invalid Credentials!');
      }

      return { user, token: getToken(user) };
    }
  },
  User: {
    // root is the value of User, comes from db
    // or `id: ({ _id, id }) => _id || id`
    id: root => root._id
  }
};

module.exports = { resolvers, getUserUsingToken };
