const actions = (dispatch, sideEffects) => {
	const { login } = sideEffects;
	const loginSubmit = async (loginState) => {
		const { userName, password } = loginState;
		const response = await login({ variables: { userName, password }})
		const token = response.data.login.jwt;
		dispatch({type: 'LOGIN', userName, token});
	}

	const logout = () => {
		dispatch({type: 'LOGOUT', userName: ''});
	}

	const registerSubmit = (registerState) => {
		dispatch({type: 'REGISTER', ...registerState});
	}

	return {
		loginSubmit,
		logout,
		registerSubmit,
	}
}

export default actions;