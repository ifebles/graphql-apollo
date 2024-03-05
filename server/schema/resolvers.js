let usersData = require('../MOCK_DATA.json');


usersData = usersData.map((m, i) => {
  if (i % 15 !== 0)
    return m;

  return {
    ...m,
    friends: usersData.slice(i + 1, i + 6),
  };
});

const resolvers = {
  Query: {
    users: () => usersData,
  },
}

module.exports = { resolvers };