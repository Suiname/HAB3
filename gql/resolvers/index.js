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

const getUsersByIdQuery = async (id) => {
	const result = await db.sequelize.query(`SELECT id, username, email, created_at, updated_at, type FROM users where id = :id`, { replacements: { id }, type: db.sequelize.QueryTypes.SELECT});
	return result.map(({id, username, email, created_at, updated_at, type }) => ({ id, username, email, createdAt: formatDate(created_at), updatedAt: formatDate(updated_at), type }))
};

const postJSON = async (url, params) => {
	const response = await fetch(url, {
		method: 'post',
		body:    JSON.stringify(params),
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.status < 400) {
		return await response.json();
	} else { // some sort of error
		throw new Error(`Server responded with ${response.status}`);
	}
}

const resolvers = {
	Query: {
		users: async (_parent, _, { user }) => {
			if (user && user.type === 'admin') {
				return await getUsersQuery();
			}
			throw new Error('Not Authorized');
		},
		me: async (_parent, _, { user }) => {
			if (user) {
				const { id } = user;
				const result = await getUsersByIdQuery(id);
				return result[0];
			}
			throw new Error('Not Authorized');
		}
	},
	Mutation: {
		login: async (_parent, {username, password}, _context) => {
			const url = baseUrl + '/auth/login';
			const { token } = await postJSON(url, { username, password });
			return { jwt: token };
		},
		register: async (_parent, {username, password, email}, _context) => {
			const url = baseUrl + '/auth/register';
			const { token } = await postJSON(url, { username, password, email });
			return { jwt: token };
		},
		verify: async (_parent, { token }, _context) => {
			const url = baseUrl + '/auth/verify';
			const { username } = await postJSON(url, { token });
			return { username };
		},
	},
};

module.exports = resolvers;