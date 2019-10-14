import React from 'react'
import { Container, Row, Col } from 'shards-react';

import Card from '../components/UserCard';

const Home = (props) => {
	const { profile } = props;

	return(
		<Container className="homeContainer mt-5 text-center">
			<Row>
				<Col sm={{ size: 8, offset: 2 }}>
					<div>
						<Card {...profile} />
					</div>
				</Col>
			</Row>
			
		</Container>
		
	)
}

export default Home;