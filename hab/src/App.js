import React, { useEffect }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Register from './containers/Register';
import Home from './components/Home';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import { useStateValue } from './state';
import { useReturnAction, useLogoutAction, useFetchMeAction } from './actions';

function App() {
  const [{login, profile}] = useStateValue();
  const { userName, token, loading } = login;
  const { returnAction } = useReturnAction();
  const { logoutAction } = useLogoutAction();
  const { fetchMeAction } = useFetchMeAction();
  const localToken = localStorage.getItem('token');
  const loggedIn = userName && token;

  useEffect(() => {
    const returningWithToken = !loading && !loggedIn && localToken;
    returningWithToken && returnAction({ token: localToken});
  });

  useEffect(() => {
    const loadUserProfile = !profile.loading && loggedIn && !profile.profile;
    loadUserProfile && fetchMeAction();
  })

  return (
      <div className="App">
        <Navbar userName={userName} logout={logoutAction} />
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <header className="App-header">
              </header>
              <Loading open={loading} />
                { !loggedIn &&
                  <Login />
                }
                { loggedIn &&
                  <Home profile={profile.profile} />
                }
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
