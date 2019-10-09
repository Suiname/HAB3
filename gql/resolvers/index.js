const fetch = require('node-fetch');
require('dotenv').config();

const db  = require('../models');
const { BASE_URL: baseUrl } = process.env;

const formatDate = (date) => {
	return !!date ? date.toLocaleDateString() +' '+ date.toLocaleTimeString() : '';
};

const getUsersQuery = async () => {
	const result = await db.sequelize.query(`SELECT id, username, email, created_at, updated_at, type FROM users`, { type: db.sequelize.QueryTypes.SELECT});
	return result.map(({id, username, email, created_at, updated_at, type }) => ({ id, username, email, createdAt: formatDate(created_at), updatedAt: formatDate(updated_at), type }))
};

const postJSON = async (url, params) => {
	const response = await fetch(url, {
		method: 'post',
		body:    JSON.stringify(params),
		headers: { 'Content-Type': 'application/json' },
	});
	return await response.json();
}

const resolvers = {
	Query: {
		users: async (_parent, _, { user }) => {
			if (user && user.type === 'admin') {
				return await getUsersQuery();
			}
			throw new Error('Not Authorized');
		},
	},
	Mutation: {
		login: async (_parent, {username, password}, _context) => {
			const url = baseUrl + '/auth/login';
			const params = { username, password };
			const { token } = await postJSON(url, params);
			return { jwt: token };
		},
		register: async (_parent, {username, password, email}, _context) => {
			const url = baseUrl + '/auth/register';
			const params = { username, password, email };
			const { token } = await postJSON(url, params);
			return { jwt: token };
		},
	},
};

module.exports = resolvers;