import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';


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

  if (error)
    console.error(error);

  const postCallContent = loading ? (
    <div>
      <h1>Data is loading...</h1>
    </div>
  ) : (
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
        {!data ? (
          <tr>
            <td colSpan={4}>
              <h2 style={{ color: 'gray' }}>
                <i>No data to show</i>
              </h2>
            </td>
          </tr>
        ) :
          data.users.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.username}</td>
              <td>{m.age}</td>
              <td>{m.nationality}</td>
            </tr>
          ))}
      </tbody>
    </table>
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