const { ApolloServer } = require("apollo-server")

const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
  }),
});

server.listen()
  .then(({ url }) => {
    console.log(`API running at: ${url}`);
  })