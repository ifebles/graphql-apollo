let usersData = require('../USER_MOCK_DATA.json');
const moviesData = require('../MOVIE_MOCK_DATA.json');


usersData = usersData.map((m, i) => {
  if (i % 15 !== 0)
    return m;

  return {
    ...m,
    friends: usersData.slice(i + 1, i + 6),
  };
});

///

const resolvers = {
  Query: {
    users: () => usersData,
    user: (_parent, args) => {
      const user = usersData.find(f => f.id === +args.id);
      return user || null;
    },

    movies: () => moviesData,
    movie: (_parent, args) => {
      const movie = moviesData
        .find(f => f.name.toLowerCase().includes(args.name.toLowerCase()));

      return movie || null;
    },
  },
}

module.exports = { resolvers };