import React from 'react';
import { withRouter } from 'react-router-dom';
import useForm from '../hooks/useForm';

const Register = (props) => {
	const initialState = {
		userName: '',
		password: '',
		email: '',
	}
	const { registerSubmit, history } = props;
	const { values, handleChange, handleSubmit } = useForm(initialState, registerSubmit);
	const { userName, password, email } = values;
	const onSubmit = (e) => {
		handleSubmit(e);
		history.push('/');
	}

	return(
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" id="userName" name="userName" onChange={handleChange} value={userName} >
				</input>
				<label htmlFor="userName">
					Username
				</label>
				<input type="text" id="password" name="password" onChange={handleChange} value={password} >
				</input>
				<label htmlFor="password">
					Password
				</label>
				<input type="text" id="email" name="email" onChange={handleChange} value={email} >
				</input>
				<label htmlFor="email">
					email
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}


export default withRouter(Register);
