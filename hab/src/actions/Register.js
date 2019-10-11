import { REGISTER } from '../graphql';
import useForm from '../hooks/useForm';
import { useStateValue } from '../state';
import { useMutation } from '@apollo/react-hooks';

export const useRegisterAction = (initialState) => {

	const [,dispatch] = useStateValue();
	const [register] = useMutation(REGISTER);
	const { values, handleChange } = useForm(initialState);
	const { userName } = values;

	const registerAction = async () => {
		try {
			dispatch({type: 'REGISTER_REQUEST'});
			const response = await register({ variables: values })
			const token = response.data.register.jwt;
			localStorage.setItem('token', token);
			dispatch({type: 'REGISTER', userName, token});
		} catch (error) {
			dispatch({type: 'REGISTER_ERROR', error});
		}
	}

	return {
		values,
		handleChange,
		registerAction
	}
}