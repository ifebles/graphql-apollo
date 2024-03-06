import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import InputFilter from "../custom/inputFilter";

import "../../css/displayers/displaySingleMovie.css";


const QUERY_SINGLE_MOVIE = gql`
  query GetSingleMovie($name: String!) {
    movie(name: $name) {
      id
      name
      publicationYear
      inTheaters
    }
  }
`

export default function DisplaySingleMovie() {
  const [movieName, setMovieName] = useState(null);
  const [fetchSingleMovie, { data, error, loading }] = useLazyQuery(QUERY_SINGLE_MOVIE);

  if (error)
    console.error(error);

  return (
    <div>
      <h1>Get Movie by name</h1>

      <InputFilter label={"Movie name:"} delay={500} onDelayedChange={val => {
        if (!val) {
          if (movieName !== null)
            setMovieName(null);

          return;
        }

        setMovieName(val);
        fetchSingleMovie({
          variables: {
            name: val,
          },
        });
      }} />

      <div className="single-movie-holder">
        {loading ?
          "Data is loading..." :
          (data?.movie && (
            <div key={data.movie.id}>
              <h3>Name: {data.movie.name}</h3>
              <h3>Year: {data.movie.publicationYear}</h3>

              {data.movie.inTheaters && (
                <span className="theaters-badge">
                  In theaters!
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}