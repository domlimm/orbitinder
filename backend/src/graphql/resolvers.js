const users = [
  {
    id: 1,
    email: 'dom@dom.com',
    name: 'Dominic'
  },
  {
    id: 2,
    email: 'roopa@roopa.com',
    name: 'Roopa'
  }
];

const resolvers = {
  Query: {
    info: () => "Let's go OrbiTinder!",
    getUser: (_, { id }) => null
  }
};

module.exports = resolvers;
