import gql from 'graphql-tag';

export const LOGIN = gql`
mutation Login($userName: String!, $password: String!){
	login(username: $userName, password: $password){
		jwt
	}
}
`;

export const VERIFY = gql`
mutation Verify($token: String!){
	verify(token: $token){
		username
	}
}`;