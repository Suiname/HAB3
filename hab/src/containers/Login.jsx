import React from 'react';
import { Form, FormGroup, FormInput, Button, ButtonGroup, Container, Row, Col } from "shards-react";
import useForm from '../hooks/useForm';
import LinkButton from '../components/LinkButton';

const Login = (props) => {
	const initialState = {
		userName: '',
		password: '',
	}
	const { loginSubmit } = props;
	const { values, handleChange, handleSubmit } = useForm(initialState, loginSubmit);
	const { userName, password } = values;

	return(
		<div className="mt-5">
			<Container className="loginContainer">
				<Row>
					<Col sm="12" md={{ size: 8, offset: 2 }}>
						<Form onSubmit={handleSubmit}>
							<FormGroup>
								<Col sm={{ size: 8, offset: 2 }}>
									<label htmlFor="username">Username</label>
									<FormInput id="userName" name="userName" onChange={handleChange} value={userName}/>
									<label htmlFor="username">Password</label>
									<FormInput id="password" name="password" onChange={handleChange} value={password}/>
								</Col>
								<Col sm={{ size: 8, offset: 2 }} className="text-center mt-2">
									<ButtonGroup size="sm">
										<Button type="submit">Login</Button>
										<LinkButton to="/register">Register</LinkButton>
									</ButtonGroup>
								</Col>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}


export default Login;
