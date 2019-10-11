import React, { useEffect }from 'react';
import { Navbar, NavbarBrand } from 'shards-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Register from './containers/Register';
import Home from './components/Home';
import Loading from './components/Loading';
import { useStateValue } from './state';
import { useReturnAction } from './actions/Return';


function App() {
  const [{ userName, token, loading }] = useStateValue();
  const { returnAction } = useReturnAction();
  const localToken = localStorage.getItem('token', token);

  useEffect(() => {
    const returningWithToken = !loading && !userName && !token && localToken;
    returningWithToken && returnAction({ token: localToken});
  });

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
              </header>
              <Loading open={loading} />
                { !userName && !token &&
                  <Login />
                }
                { !!userName && !!token &&
                  <Home userName={userName} />
                }
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
