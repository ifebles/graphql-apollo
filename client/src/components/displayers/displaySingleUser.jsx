import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import InputFilter from "../custom/inputFilter";
import GraphQL from "../../utils/graphql";


export default function DisplaySingleUser() {
  const [userID, setUserID] = useState(null);
  const [fetchSingleUser, { data, error, loading }] = useLazyQuery(GraphQL.Query.GetSingleUser);

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