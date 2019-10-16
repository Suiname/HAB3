const fetch = require('node-fetch');
require('dotenv').config();

const { BASE_URL: baseUrl } = process.env;
const { users } = require('../models');

const postJSON = async (url, params) => {
	const response = await fetch(url, {
		method: 'post',
		body:    JSON.stringify(params),
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.status < 400) {
		return await response.json();
	} else { // some sort of error status code
		throw new Error(`Server responded with ${response.status}`);
	}
}

const resolvers = {
	Query: {
		users: async (_parent, options, { user }) => {
			if (user && user.type === 'admin') {
				const {limit = 10, offset = 0} = options;
				return await users.findAll({ limit, offset });
			}
			throw new Error('Not Authorized');
		},
		me: async (_parent, _, { user }) => {
			if (user) {
				const { id } = user;
				return await users.findByPk(id);
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