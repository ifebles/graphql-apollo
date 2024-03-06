import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import "../../css/forms/index.css";


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

const nationalities = [
  "UNITED_STATES", "ESTONIA", "RUSSIA", "CANADA", "CZECH_REPUBLIC", "CAMEROON", "CHINA",
  "ISLE_OF_MAN", "PHILIPPINES", "FINLAND", "MARSHALL_ISLANDS", "KAZAKHSTAN", "LATVIA",
  "INDONESIA", "GEORGIA", "POLAND", "BRAZIL", "JAPAN", "BHUTAN", "HUNGARY", "ETHIOPIA",
  "GREECE", "ARGENTINA", "EL_SALVADOR", "BOLIVIA", "ALBANIA", "PERU", "CROATIA",
  "SAUDI_ARABIA", "THAILAND", "FRANCE", "PORTUGAL", "DENMARK", "ARMENIA", "KIRIBATI",
  "VIETNAM", "DOMINICAN_REPUBLIC", "COLOMBIA", "UKRAINE", "AUSTRALIA", "CHILE",
  "AZERBAIJAN", "NORWAY", "BULGARIA", "AFGHANISTAN", "SWEDEN", "UZBEKISTAN", "PAKISTAN",
  "MOROCCO", "SYRIA", "GABON", "SLOVENIA", "ECUADOR", "JAMAICA", "TAJIKISTAN",
  "BONAIRE_SAINT_EUSTATIUS_AND_SABA", "MEXICO", "PARAGUAY", "SOUTH_AFRICA",
  "LITHUANIA", "CYPRUS", "MALI", "BOSNIA_AND_HERZEGOVINA", "GUATEMALA", "TANZANIA",
  "IRAN", "MONGOLIA", "GAMBIA", "MYANMAR", "EGYPT", "KENYA", "TURKMENISTAN", "REUNION",
  "MADAGASCAR", "NEW_ZEALAND", "NIGER", "MAURITIUS", "GERMANY", "HONDURAS",
  "BANGLADESH", "IRELAND", "ISRAEL", "DEMOCRATIC_REPUBLIC_OF_THE_CONGO", "URUGUAY",
  "COSTA_RICA", "LEBANON", "PANAMA", "LUXEMBOURG", "NEPAL", "CUBA",
  "UNITED_ARAB_EMIRATES", "YEMEN", "ITALY", "TUNISIA", "ZIMBABWE",
  "FRENCH_SOUTHERN_TERRITORIES", "CAPE_VERDE", "PALESTINIAN_TERRITORY", "LIBYA",
  "SOMALIA", "CENTRAL_AFRICAN_REPUBLIC", "MALAYSIA", "ALAND_ISLANDS",
  "TURKS_AND_CAICOS_ISLANDS", "NAMIBIA", "KYRGYZSTAN", "SAO_TOME_AND_PRINCIPE", "CHAD",
  "SERBIA", "BELARUS", "KOSOVO", "NIGERIA", "SAINT_LUCIA", "NETHERLANDS", "LIBERIA",
  "BENIN", "ICELAND", "NORTH_KOREA", "IRAQ", "SOUTH_KOREA", "ZAMBIA", "UNITED_KINGDOM",
  "KUWAIT", "SWAZILAND", "MACEDONIA", "SENEGAL", "IVORY_COAST", "LAOS", "COMOROS",
  "SWITZERLAND", "MALAWI",
].sort().concat("OTHER");

export default function CreateUser() {
  const [fields, setFields] = useState({});
  const [createUserMutation, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

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