const usersData = require('../MOCK_DATA.json');


const resolvers = {
  Query: {
    users: () => usersData,
  },
}

module.exports = { resolvers };