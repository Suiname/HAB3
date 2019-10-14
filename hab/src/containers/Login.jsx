import React from 'react';
import { Form, FormGroup, FormInput, Button, ButtonGroup, Container, Row, Col } from 'shards-react';

import LinkButton from '../components/LinkButton';
import { useLoginAction } from '../actions';

const Login = () => {
	const initialState = {
		userName: '',
		password: '',
	}

	const { values, handleChange, loginAction } = useLoginAction(initialState);
	const { userName, password } = values;

	return(
		<div className="mt-5">
			<Container className="loginContainer">
				<Row>
					<Col sm="12" md={{ size: 8, offset: 2 }}>
						<Form>
							<FormGroup>
								<Col sm={{ size: 8, offset: 2 }}>
									<label htmlFor="username">Username</label>
									<FormInput id="userName" name="userName" onChange={handleChange} value={userName}/>
									<label htmlFor="username">Password</label>
									<FormInput type="password" id="password" name="password" onChange={handleChange} value={password}/>
								</Col>
								<Col sm={{ size: 8, offset: 2 }} className="text-center mt-2">
									<ButtonGroup size="sm">
										<Button onClick={loginAction}>Login</Button>
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
