import React from 'react';
import { Navbar, NavbarBrand } from 'shards-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Register from './containers/Register';
import loginReducer from './reducers/Login';
import createLoginActions from './actions/Login';
import Home from './components/Home';

const { useReducer } = React;

function App() {
  const initialState = {
    userName: '',
    token: '',
  };

  const LOGIN = gql`
  mutation Login($userName: String!, $password: String!){
    login(username: $userName, password: $password){
      jwt
    }
  }
`;

const REGISTER = gql`
mutation Register($userName: String!, $password: String!, $email: String!){
  register(username: $userName, password: $password, email: $email){
    jwt
  }
}
`;
	
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [login] = useMutation(LOGIN);
  const [register] = useMutation(REGISTER);

  const { loginSubmit, logout, registerSubmit } = createLoginActions(dispatch, {login, register});

  return (
    <div className="App">
      <Navbar type="dark" theme="primary" expand="md" className="mb-2">
        <NavbarBrand href="#">React Boilerplate</NavbarBrand>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/register">
            <Register registerSubmit={registerSubmit} />
          </Route>
          <Route path="/">
            <header className="App-header">
              { !state.userName &&
                <Login state={state} loginSubmit={loginSubmit} logout={logout} />
              }
              { !!state.userName &&
                <Home userName={state.userName} />
              }
            </header>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
