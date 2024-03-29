import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";

import InputFilter from "../custom/inputFilter";
import '../../css/displayers/displayers.css';
import GraphQL from "../../utils/graphql";


export default function DisplayMoviesData() {
  const [fetchMovies, { data, loading, error, called, refetch }] = useLazyQuery(GraphQL.Query.GetAllMovies);
  const [movieFilter, setMovieFilter] = useState(null);

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

  const movies = movieFilter ?
    data?.movies
      .filter(f => f.name.toLowerCase().includes(movieFilter.toLowerCase())) :
    data?.movies;

  return (
    <div>
      <h1>List of movies</h1>

      <br />
      <br />

      <button className='refresh-btn' onClick={() => refetch()}>
        Refresh
      </button>

      <InputFilter label={"Filter movies:"} onDelayedChange={setMovieFilter} />

      <div className="vertical-displayer">
        {movies && movies.map(m => (
          <div key={m.id}>
            <h3>Movie name: {m.name}</h3>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}