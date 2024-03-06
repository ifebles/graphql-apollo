import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

import '../../css/displayers.css'


const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
    }
  }
`

export default function DisplayMoviesData() {
  const [fetchMovies, { data, loading, error, called }] = useLazyQuery(QUERY_ALL_MOVIES);

  if (!called)
    return (
      <div className="fetch-holder">
        <button onClick={() => fetchMovies()}>Fetch movies</button>
      </div>
    );

  if (loading)
    return (
      <h1>Data is loading...</h1>
    );

  if (error)
    console.error(error);

  return (
    <div>
      <h1>List of movies</h1>

      <br />
      <br />

      <div className="vertical-displayer">
        {data && data.movies.map(m => (
          <div key={m.id}>
            <h3>Movie name: {m.name}</h3>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}