import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import "../../css/forms/index.css";
import GraphQL from "../../utils/graphql";


export default function CreateMovie() {
  const [fields, setFields] = useState({
    inTheaters: false,
  });
  const [createMovieMutation, { data, loading, error }] = useMutation(GraphQL.Mutation.CreateMovie);

  ///

  const onFieldChange = (name, value) => setFields({
    ...fields,
    [name]: value,
  });

  if (error)
    console.error(error);

  return (
    <div className="form">
      <h1>Create Movie</h1>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input type="text" name="name"
          onChange={ev => onFieldChange(ev.target.name, ev.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-field">
        <label htmlFor="publicationYear">Year</label>
        <input type="number" name="publicationYear"
          onChange={ev => onFieldChange(ev.target.name, ev.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-field">
        <label htmlFor="inTheaters">In theaters?</label>
        <input type="checkbox" name="inTheaters"
          onChange={ev => onFieldChange(ev.target.name, ev.target.checked)}
          disabled={loading}
        />
      </div>

      <div className="form-field">
        <label htmlFor="throwError">Throw error?</label>
        <input type="checkbox" name="throwError"
          onChange={ev => onFieldChange(ev.target.name, ev.target.checked)}
          disabled={loading}
        />
      </div>

      <button disabled={loading} onClick={() => {
        const fieldNames = ['name', 'publicationYear', 'inTheaters'];

        for (const a of fieldNames)
          if (fields[a] === undefined) {
            alert(`Invalid value for field "${a}"`);
            return;
          }

        createMovieMutation({
          variables: {
            input: {
              ...fields,
              publicationYear: +fields.publicationYear,
            },
          },
        });
      }}>
        Create
      </button>

      {data?.createMovie && (data.createMovie.message ? (
        <div>
          {data.createMovie.message}
        </div>
      ) : (
        <div key={data.createMovie.id}>
          <h2>Last created Movie</h2>

          <h3>ID: {data.createMovie.id}</h3>
          <h3>Name: {data.createMovie.name}</h3>
        </div>
      ))}
    </div>
  );
}