import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import DisplayUsersData from './components/displayers/displayUsersData';
import DisplayMoviesData from './components/displayers/displayMoviesData';
import DisplaySingleUser from './components/displayers/displaySingleUser';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.REACT_APP_SERVER_URI,
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayMoviesData />

        <hr />
        <br />

        <DisplayUsersData />

        <hr />
        <br />

        <DisplaySingleUser />

        <br />
        <hr />
      </div>
    </ApolloProvider>
  );
}

export default App;
