import React from 'react';
import { Navbar, NavbarBrand } from 'shards-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Register from './containers/Register';
import Home from './components/Home';
import { useStateValue } from './state';


function App() {
  const [{ userName, token }] = useStateValue();

  return (
      <div className="App">
        <Navbar type="dark" theme="primary" expand="md" className="mb-2">
          <NavbarBrand href="#">React Boilerplate</NavbarBrand>
        </Navbar>
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <header className="App-header">
                { !userName && !token &&
                  <Login />
                }
                { !!userName && !!token &&
                  <Home userName={userName} />
                }
              </header>
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
