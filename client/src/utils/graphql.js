import { gql } from "@apollo/client";


const GraphQL = {
  get Query() {
    const root = this;

    return {
      get GetAllUsers() {
        const { GetUserSimpleDetails } = root.Fragments;

        return gql`
          query GetAllUsers {
            users {
              id
              ${GetUserSimpleDetails.ref}
            }
          }

          ${GetUserSimpleDetails.def}
        `;
      },
      get GetSingleUser() {
        const { GetUserSimpleDetails } = root.Fragments;

        return gql`
          query GetSingleUser($userID: ID!) {
            user(id: $userID) {
              ${GetUserSimpleDetails.ref}
            }
          }

          ${GetUserSimpleDetails.def}
        `;
      },
      get GetAllMovies() {
        const { GetMovieIdentification } = root.Fragments;

        return gql`
          query GetAllMovies {
            movies {
              ${GetMovieIdentification.ref}
            }
          }

          ${GetMovieIdentification.def}
        `;
      },
      get GetSingleMovie() {
        const { GetMovieIdentification } = root.Fragments;

        return gql`
          query GetSingleMovie($name: String!) {
            movie(name: $name) {
              ${GetMovieIdentification.ref}
              publicationYear
              inTheaters
            }
          }

          ${GetMovieIdentification.def}
        `;
      },
      get GetAllNationalities() {
        return gql`
          query GetAllNationalities {
            nationalities
          }
        `;
      },
    };
  },
  get Mutation() {
    const root = this;

    return {
      get CreateUser() {
        const { GetUserSimpleDetails } = root.Fragments;

        return gql`
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              id
              ${GetUserSimpleDetails.ref}
            }
          }

          ${GetUserSimpleDetails.def}
        `;
      },
      get CreateMovie() {
        const { GetMovieIdentification } = root.Fragments;

        return gql`
          mutation CreateMovie($input: CreateMovieInput!) {
            createMovie(input: $input) {
              ...on Movie {
                ${GetMovieIdentification.ref}
              }
              ...on ErrorResponse {
                message
              }
            }
          }

          ${GetMovieIdentification.def}
        `;
      },
    };
  },
  get Fragments() {
    return {
      get GetUserSimpleDetails() {
        const name = 'GetUserSimpleDetails';

        return {
          get ref() { return `...${name}`; },
          get def() {
            return gql`
              fragment ${name} on User {
                username
                name
                age
                nationality
              }
            `;
          },
        };
      },
      get GetMovieIdentification() {
        const name = 'GetMovieIdentification';

        return {
          get ref() { return `...${name}`; },
          get def() {
            return gql`
              fragment ${name} on Movie {
                id
                name
              }
            `;
          },
        };
      },
    }
  },
};

export default GraphQL;