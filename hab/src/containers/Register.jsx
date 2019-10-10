import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, FormInput, Button, Container, Row, Col } from 'shards-react';

import { useRegisterAction } from '../actions/Register';

const Register = (props) => {
	const { history } = props;
	const initialState = {
		userName: '',
		password: '',
		email: '',
	}
	const { values, handleChange, registerAction } = useRegisterAction(initialState);
	const { userName, password, email } = values;

	const onSubmit = async (e) => {
		e.preventDefault();
		await registerAction();
		history.push('/');
	}

	return(
		<div className="mt-5">
			<Container className="registerContainer">
				<Row>
					<Col sm="12" md={{ size: 8, offset: 2 }}>
						<Form onSubmit={onSubmit}>
							<FormGroup>
								<Col sm={{ size:8, offset: 2 }}>
								<label htmlFor="userName">
									Username
								</label>
								<FormInput id="userName" name="userName" onChange={handleChange} value={userName} />
								<label htmlFor="password">
									Password
								</label>
								<FormInput type="password" id="password" name="password" onChange={handleChange} value={password} />
								<label htmlFor="email">
									Email
								</label>
								<FormInput id="email" name="email" onChange={handleChange} value={email} />
								</Col>
								<Col sm={{ size: 8, offset: 2 }} className="text-center mt-2">
									<Button type="submit">Submit</Button>
								</Col>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}


export default withRouter(Register);
