import { Link } from 'react-router-dom'
import React from 'react';
import useForm from '../hooks/useForm';

const Login = (props) => {
	const initialState = {
		userName: '',
		password: '',
	}
	const { state, loginSubmit, logout } = props;
	const { values, handleChange, handleSubmit, resetValues } = useForm(initialState, loginSubmit);
	const { userName, password } = values;

	const logoutClick = () => {
		resetValues();
		logout();
	}

	return(
		<div>
			{ !!state.userName &&
				<div>
					<div>
						<h1>hello {state.userName}</h1>
					</div>
					<div>
						<button onClick={logoutClick}>Logout</button>
					</div>
				</div>
			}

			{ !state.userName && 
			<form onSubmit={handleSubmit}>
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
				<button type="submit">Submit</button>
				<Link to="/register"><button>Register</button></Link>
			</form>}
		</div>
	);
}


export default Login;
