import gql from 'graphql-tag';

export const REGISTER = gql`
mutation Register($userName: String!, $password: String!, $email: String!){
	register(username: $userName, password: $password, email: $email){
		jwt
	}
}`;
