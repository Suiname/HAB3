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
		const response = await register({ variables: values })
		const token = response.data.register.jwt;
		dispatch({type: 'REGISTER', userName, token});
	}

	return {
		values,
		handleChange,
		registerAction
	}
}