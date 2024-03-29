const { usersData, moviesData, nationalities } = require("../db");


const resolvers = {
  Query: {
    nationalities: () => nationalities,

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
  User: {
    favoriteMovies: () => {
      return moviesData.filter(f => f.publicationYear > 2004);
    },
  },

  Mutation: {
    createUser: (_parent, args) => {
      const user = {
        id: usersData.length + 1,
        name: args.input.name,
        username: args.input.username,
        age: args.input.age,
        nationality: args.input.nationality,
      };

      usersData.push(user);
      return user;
    },
    updateUsername: (_parent, args) => {
      const user = usersData.find(f => f.id === +args.input.id);

      if (!user)
        return null;

      user.username = args.input.username;
      return user;
    },
    deleteUser: (_parent, args) => {
      usersData = usersData.filter(f => f.id !== +args.id);
      return null;
    },

    createMovie: (_parent, args) => {
      if (args.input.throwError)
        return {
          message: 'An error was requested to be thrown',
        };

      const movie = {
        id: moviesData.length + 1,
        name: args.input.name,
        publicationYear: args.input.publicationYear,
        inTheaters: args.input.inTheaters,
      };

      moviesData.push(movie);
      return movie;
    },
  },

  MovieCreationResult: {
    __resolveType: obj => {
      if (obj.id)
        return 'Movie';
      if (obj.message)
        return 'ErrorResponse';

      return null;
    },
  },
}

module.exports = { resolvers };