const actions = (dispatch, sideEffects) => {
	const { login, register } = sideEffects;
	const loginSubmit = async (loginState) => {
		const { userName, password } = loginState;
		const response = await login({ variables: { userName, password }})
		const token = response.data.login.jwt;
		dispatch({type: 'LOGIN', userName, token});
	}

	const logout = () => {
		dispatch({type: 'LOGOUT', userName: ''});
	}

	const registerSubmit = async (registerState) => {
		const { userName } = registerState;
		const response = await register({ variables: registerState})
		const token = response.data.register.jwt;
		dispatch({type: 'REGISTER', userName, token});
	}

	return {
		loginSubmit,
		logout,
		registerSubmit,
	}
}

export default actions;