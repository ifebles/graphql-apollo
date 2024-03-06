const moviesData = require("./MOVIE_MOCK_DATA.json");
let usersData = require("./USER_MOCK_DATA.json");


const otherNationality = 'OTHER';

const nationalities = usersData
  .map(m => m.nationality)
  .filter((e, i, o) => o.indexOf(e) === i && e !== otherNationality)
  .sort()
  .concat(otherNationality);

// Modify users data to simulate friends
usersData = usersData.map((m, i) => {
  if (i % 15 !== 0)
    return m;

  return {
    ...m,
    friends: usersData.slice(i + 1, i + 6),
  };
});

///

module.exports = {
  nationalities,
  usersData,
  moviesData,
};