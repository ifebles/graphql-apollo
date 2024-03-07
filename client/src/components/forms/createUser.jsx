import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import "../../css/forms/index.css";


const QUERY_ALL_NATIONALITIES = gql`
  query GetAllNationalities {
    nationalities
  }
`

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
      username
      nationality
    }
  }
`;

export default function CreateUser() {
  const [fields, setFields] = useState({});
  const [nationalities, setNationalities] = useState([]);
  const [getAllNationalities] = useLazyQuery(QUERY_ALL_NATIONALITIES);
  const [createUserMutation, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  useEffect(() => {
    getAllNationalities({
      onCompleted: data => setNationalities(data.nationalities),
      onError: console.error,
    });
  }, [getAllNationalities]);

  ///

  const onFieldChange = ev => setFields({
    ...fields,
    [ev.target.name]: ev.target.value,
  });

  if (error)
    console.error(error);

  return (
    <div className="form">
      <h1>Create User</h1>

      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={onFieldChange} disabled={loading} />
      </div>

      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={onFieldChange} disabled={loading} />
      </div>

      <div className="form-field">
        <label htmlFor="age">Age</label>
        <input type="number" name="age" onChange={onFieldChange} disabled={loading} />
      </div>

      <div className="form-field">
        <label htmlFor="nationality">Nationality</label>
        <select name="nationality" onChange={onFieldChange} disabled={loading}>
          <option value="">Select an option</option>
          {nationalities.map((m, i) => (
            <option key={i} value={m}>
              {
                m.toLowerCase().split('_')
                  .map(w => w[0].toUpperCase() + w.substring(1))
                  .join(' ')
              }
            </option>
          ))}
        </select>
      </div>

      <button disabled={loading} onClick={() => {
        const fieldNames = ['username', 'name', 'age', 'nationality'];

        for (const a of fieldNames)
          if (!fields[a]) {
            alert(`Invalid value for field "${a}"`);
            return;
          }

        createUserMutation({
          variables: {
            input: {
              ...fields,
              age: +fields.age,
            },
          },
        });
      }}>
        Create
      </button>

      {data?.createUser && (
        <div key={data.createUser.id}>
          <h2>Last created User</h2>

          <h3>ID: {data.createUser.id}</h3>
          <h3>Username: {data.createUser.username}</h3>
          <h3>Name: {data.createUser.name}</h3>
          <h3>Age: {data.createUser.age}</h3>
          <h3>Nationality: {data.createUser.nationality}</h3>
        </div>
      )}
    </div>
  );
}