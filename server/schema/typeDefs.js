const { gql } = require("apollo-server");
const { nationalities } = require("../db");


const typeDefs = gql`
type User {
  id: ID!
  name: String!
  username: String!
  age: Int!
  nationality: Nationality!
  friends: [User!]
  favoriteMovies: [Movie!]
}

type Movie {
  id: ID!
  name: String!
  publicationYear: Int!
  inTheaters: Boolean!
}

type Query {
  nationalities: [Nationality!]!

  users: [User!]!
  user(id: ID!): User

  movies: [Movie!]!
  movie(name: String!): Movie
}

input CreateUserInput {
  name: String!
  username: String!
  age: Int!
  nationality: Nationality = OTHER
}

input UpdateUsernameInput {
  id: ID!
  username: String!
}

input CreateMovieInput {
  name: String!
  publicationYear: Int!
  inTheaters: Boolean!
  throwError: Boolean
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUsername(input: UpdateUsernameInput!): User
  deleteUser(id: ID!): User

  createMovie(input: CreateMovieInput!): MovieCreationResult!
}

enum Nationality {
  ${nationalities.join('\n')}
}

type ErrorResponse {
  message: String!
}

union MovieCreationResult = Movie | ErrorResponse
`;

module.exports = { typeDefs };