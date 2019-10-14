import { useApolloClient } from '@apollo/react-hooks';
import { useStateValue } from '../state';
import { ME } from '../graphql';

export const useFetchMeAction = () => {
	const [, dispatch] = useStateValue();
	const client = useApolloClient();

	const fetchMeAction = async () => {
		try {
			dispatch({type: 'FETCH_ME_REQUEST'});
			const result = await client.query({query: ME});
			const { data } = result;
			dispatch({type: 'FETCH_ME', profile: data.me});
		} catch (error) {
			dispatch({type: 'FETCH_ME_ERROR', error});
		}
	}

	return {
		fetchMeAction,
	}
}
