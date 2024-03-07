import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import InputFilter from '../custom/inputFilter';

import '../../css/displayers/displayers.css';


const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`

function DisplayUsersData() {
  const [fetchUsers, { loading, data, error, called }] = useLazyQuery(QUERY_ALL_USERS);
  const [userFilter, setUserFilter] = useState(null);

  if (error)
    console.error(error);

  const users = !userFilter ?
    data?.users :
    data?.users.filter(f => {
      if (!isNaN(userFilter))
        return f.id === userFilter || f.age === +userFilter;

      const lcFilter = userFilter.toLowerCase().trim();

      return f.username.toLowerCase().includes(lcFilter)
        || f.name.toLowerCase().includes(lcFilter)
        || f.nationality.toLowerCase().replace(/_/g, ' ').includes(lcFilter);
    });

  const postCallContent = loading ? (
    <div>
      <h1>Data is loading...</h1>
    </div>
  ) : (
    <>
      <button className='refresh-btn' onClick={() => fetchUsers({fetchPolicy: 'cache-and-network'})}>Refresh</button>
      <InputFilter label={"Filter users:"} onDelayedChange={setUserFilter} />

      <table className='table-displayer'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Age</th>
            <th>Nationality</th>
          </tr>
        </thead>

        <tbody>
          {!users ? (
            <tr>
              <td colSpan={4}>
                <h2 style={{ color: 'gray' }}>
                  <i>No data to show</i>
                </h2>
              </td>
            </tr>
          ) :
            users.map(m => (
              <tr key={m.id}>
                <td>{m.username}</td>
                <td>{m.name}</td>
                <td>{m.age}</td>
                <td>{m.nationality}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div>
      <h1>List of Users</h1>

      <br />
      <br />

      {!called ? (
        <div className="fetch-holder">
          <button onClick={() => fetchUsers()}>Fetch data</button>
        </div>
      ) :
        postCallContent}
    </div>
  );
}


export default DisplayUsersData;