import { useMutation } from '@apollo/react-hooks';
import { useStateValue } from '../state';
import { LOGIN } from '../graphql';
import useForm from '../hooks/useForm';

export const useLoginAction = (initialState) => {
	const { values, handleChange, resetValues } = useForm(initialState);
	const [, dispatch] = useStateValue();
	const [login] = useMutation(LOGIN);

	const loginAction = async () => {
		const { userName } = values;
		const response = await login({ variables: values })
		const token = response.data.login.jwt;
		dispatch({type: 'LOGIN', userName, token});
	}

	return {
		values,
		handleChange,
		loginAction,
		resetValues,
	}
}
