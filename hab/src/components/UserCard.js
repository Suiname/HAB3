import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'shards-react';

const userCard = (props) => {
	const { id, username, type, email, updatedAt } = props;
	return (
		<Card style={{ maxWidth: "300px" }}>
			<CardHeader>Your Account</CardHeader>
			<CardBody>
			<p>username: {username}</p>
			<p>id: {id}</p>
			<p>User type: {type}</p>
			<p>Email: {email}</p>
			</CardBody>
			<CardFooter>Updated: {updatedAt} </CardFooter>
		</Card>
	);
}

export default userCard;