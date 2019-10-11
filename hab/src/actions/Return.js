import { useMutation } from '@apollo/react-hooks';
import { useStateValue } from '../state';
import { VERIFY } from '../graphql';

export const useReturnAction = () => {
	const [, dispatch] = useStateValue();
	const [verify] = useMutation(VERIFY);

	const returnAction = async ({ token }) => {
		dispatch({type: 'RETURN_REQUEST' });
		try {
			const response = await verify({ variables: { token } })
			const userName = response.data.verify.username;
			dispatch({type: 'RETURN', userName, token });
		} catch (error) {
			localStorage.removeItem('token');
			dispatch({type: 'RETURN_ERROR', error });
		}
	}

	return {
		returnAction,
	}
}
