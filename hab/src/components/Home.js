import React from 'react'
import { Container, Row, Col } from 'shards-react';

const Home = (props) => {
	const { userName } = props;
	return(
		<Container className="homeContainer mt-5 text-center">
			<Row>
				<Col sm={{ size: 8, offset: 2 }}>
					<div>
						<h1>Hello {userName}</h1>
					</div>
				</Col>
			</Row>
			
		</Container>
		
	)
}

export default Home;