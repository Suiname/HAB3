import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './containers/Login';
import loginReducer from './reducers/Login';
const { useReducer } = React;

function App() {
  const initialState = {
		userName: '',
	};
	
	const [state, dispatch] = useReducer(loginReducer, initialState);

	const loginSubmit = (loginState) => {
		console.log(loginState);
		dispatch({type: 'LOGIN', ...loginState});
  }

  return (
    <div className="App">
      <header className="App-header">
        <Login state={state} loginSubmit={loginSubmit} />
      </header>
    </div>
  );
}

export default App;
