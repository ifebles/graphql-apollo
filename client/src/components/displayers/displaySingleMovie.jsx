import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import InputFilter from "../custom/inputFilter";

import "../../css/displayers/displaySingleMovie.css";
import GraphQL from "../../utils/graphql";


export default function DisplaySingleMovie() {
  const [movieName, setMovieName] = useState(null);
  const [fetchSingleMovie, { data, error, loading }] = useLazyQuery(GraphQL.Query.GetSingleMovie);

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