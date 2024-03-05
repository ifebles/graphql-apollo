const { gql } = require("apollo-server");

const nationalities = [
  "UNITED_STATES", "ESTONIA", "RUSSIA", "CANADA", "CZECH_REPUBLIC", "CAMEROON", "CHINA",
  "ISLE_OF_MAN", "PHILIPPINES", "FINLAND", "MARSHALL_ISLANDS", "KAZAKHSTAN", "LATVIA",
  "INDONESIA", "GEORGIA", "POLAND", "BRAZIL", "JAPAN", "BHUTAN", "HUNGARY", "ETHIOPIA",
  "GREECE", "ARGENTINA", "EL_SALVADOR", "BOLIVIA", "ALBANIA", "PERU", "CROATIA",
  "SAUDI_ARABIA", "THAILAND", "FRANCE", "PORTUGAL", "DENMARK", "ARMENIA", "KIRIBATI",
  "VIETNAM", "DOMINICAN_REPUBLIC", "COLOMBIA", "UKRAINE", "AUSTRALIA", "CHILE",
  "AZERBAIJAN", "NORWAY", "BULGARIA", "AFGHANISTAN", "SWEDEN", "UZBEKISTAN", "PAKISTAN",
  "MOROCCO", "SYRIA", "GABON", "SLOVENIA", "ECUADOR", "JAMAICA", "TAJIKISTAN",
  "BONAIRE_SAINT_EUSTATIUS_AND_SABA_", "MEXICO", "PARAGUAY", "SOUTH_AFRICA",
  "LITHUANIA", "CYPRUS", "MALI", "BOSNIA_AND_HERZEGOVINA", "GUATEMALA", "TANZANIA",
  "IRAN", "MONGOLIA", "GAMBIA", "MYANMAR", "EGYPT", "KENYA", "TURKMENISTAN", "REUNION",
  "MADAGASCAR", "NEW_ZEALAND", "NIGER", "MAURITIUS", "GERMANY", "HONDURAS",
  "BANGLADESH", "IRELAND", "ISRAEL", "DEMOCRATIC_REPUBLIC_OF_THE_CONGO", "URUGUAY",
  "COSTA_RICA", "LEBANON", "PANAMA", "LUXEMBOURG", "NEPAL", "CUBA",
  "UNITED_ARAB_EMIRATES", "YEMEN", "ITALY", "TUNISIA", "ZIMBABWE",
  "FRENCH_SOUTHERN_TERRITORIES", "CAPE_VERDE", "PALESTINIAN_TERRITORY", "LIBYA",
  "SOMALIA", "CENTRAL_AFRICAN_REPUBLIC", "MALAYSIA", "ALAND_ISLANDS",
  "TURKS_AND_CAICOS_ISLANDS", "NAMIBIA", "KYRGYZSTAN", "SAO_TOME_AND_PRINCIPE", "CHAD",
  "SERBIA", "BELARUS", "KOSOVO", "NIGERIA", "SAINT_LUCIA", "NETHERLANDS", "LIBERIA",
  "BENIN", "ICELAND", "NORTH_KOREA", "IRAQ", "SOUTH_KOREA", "ZAMBIA", "UNITED_KINGDOM",
  "KUWAIT", "SWAZILAND", "MACEDONIA", "SENEGAL", "IVORY_COAST", "LAOS", "COMOROS",
  "SWITZERLAND", "MALAWI", "OTHER",
];

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

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUsername(input: UpdateUsernameInput!): User
  deleteUser(id: ID!): User
}

enum Nationality {
  ${nationalities.join('\n')}
}
`;

module.exports = { typeDefs };