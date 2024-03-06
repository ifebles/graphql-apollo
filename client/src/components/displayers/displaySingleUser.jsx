import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import InputFilter from "../custom/inputFilter";


const QUERY_SINGLE_USER = gql`
  query GetSingleUser($userID: ID!) {
    user(id: $userID) {
      name
      username
      age
      nationality
    }
  }
`

export default function DisplaySingleUser() {
  const [userID, setUserID] = useState(null);
  const [fetchSingleUser, { data, error, loading }] = useLazyQuery(QUERY_SINGLE_USER);

  if (error)
    console.error(error);

  return (
    <div>
      <h1>Get User by ID</h1>

      <InputFilter label={"User ID:"} delay={500} onDelayedChange={val => {
        if (isNaN(val)) {
          if (userID !== null)
            setUserID(null);

          return;
        }

        const num = +val;
        setUserID(num);
        fetchSingleUser({
          variables: {
            userID: num,
          },
        });
      }} />

      <div>
        {loading ?
          "Data is loading..." :
          (data?.user && (
            <div key={userID}>
              <h3>Username: {data.user.username}</h3>
              <h3>Name: {data.user.name}</h3>
              <h3>Age: {data.user.age}</h3>
              <h3>Nationality: {data.user.nationality}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}