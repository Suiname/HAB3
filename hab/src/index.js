import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './state';
import loginReducer from './reducers/Login';


import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

const client = new ApolloClient({
	uri: 'http://gql.localhost/graphql',
});

const initialState = {
    userName: '',
    token: '',
  };

ReactDOM.render(<ApolloProvider client={client}>
	    <StateProvider initialState={initialState} reducer={loginReducer}>
			<App />
		</StateProvider>
	</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
