import React from 'react';
import './App.css';
import Login from './containers/Login';
import Register from './containers/Register';
import loginReducer from './reducers/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const { useReducer } = React;

function App() {
  const initialState = {
    userName: '',
  };
	
  const [state, dispatch] = useReducer(loginReducer, initialState);

	const loginSubmit = (loginState) => {
		dispatch({type: 'LOGIN', ...loginState});
  }

  const logout = () => {
    dispatch({type: 'LOGOUT', userName: ''});
  }

  const registerSubmit = (registerState) => {
    dispatch({type: 'REGISTER', ...registerState});
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            <Register registerSubmit={registerSubmit} />
          </Route>
          <Route path="/">
            <header className="App-header">
              <Login state={state} loginSubmit={loginSubmit} logout={logout} />
            </header>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
