const db  = require('../models');

const formatDate = (date) => {
	return !!date ? date.toLocaleDateString() +' '+ date.toLocaleTimeString() : '';
};

const getUsersQuery = async () => {
	const result = await db.sequelize.query(`SELECT * FROM users`, { type: db.sequelize.QueryTypes.SELECT});
	return result.map(({id, username, password, created_at, updated_at }) => ({ id, username, password, createdAt: formatDate(created_at), updatedAt: formatDate(updated_at) }))
};

const resolvers = {
	Query: {
		users: async () => await getUsersQuery(),
	},
};

module.exports = resolvers;