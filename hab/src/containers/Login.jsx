import React from 'react';
const { useState } = React;

const Login = (props) => {

	const { state, loginSubmit } = props;

	const [loginState, setUsername] = useState({
		userName: '',
		password: ''
	});

	const onChange = (property) => (e) => {
		// console.log(e.target.value);
		setUsername({
			...loginState,
			[property]: e.target.value,
		});
	}

	return(
		<div>
			{ !!state.userName && <h1>hello {state.userName}</h1>}

			{ !state.userName && 
			<form>
				<input type="text" id="userName" name="userName" value={loginState.userName} onChange={onChange('userName')} >
				</input>
				<label htmlFor="userName">
					Username
				</label>
				<input type="text" id="password" name="password" value={loginState.password} onChange={onChange('password')}>
				</input>
				<label htmlFor="password">
					Password
				</label>
				<button onClick={() => loginSubmit(loginState)}>Submit</button>
			</form>}
		</div>
	);
}


export default Login;
