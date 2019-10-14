import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider, initialState } from './state';
import { combineReducers, loginReducer, profileReducer } from './reducers';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

const client = new ApolloClient({
	uri: 'http://gql.localhost/graphql',
	request: operation => {
		const token = localStorage.getItem('token');
		if (token) {
			operation.setContext({
				headers: {
				  authorization: 'Bearer ' + token,
				},
			});
		}
	  },
});

const reducer = combineReducers({login: loginReducer, profile: profileReducer});

ReactDOM.render(<ApolloProvider client={client}>
	    <StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
