import gql from 'graphql-tag';

export const ME = gql`
query MyAccount {
	me {
		username
		id
		updatedAt
		email
		type
	}
}`;