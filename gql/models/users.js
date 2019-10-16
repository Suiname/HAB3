const formatDate = (date) => {
	return !!date ? date.toLocaleDateString() +' '+ date.toLocaleTimeString() : '';
};

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now'),
      field: 'created_at',
      get() {
        return formatDate(this.getDataValue('createdAt'));
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now'),
      field: 'updated_at',
      get() {
        return formatDate(this.getDataValue('updatedAt'));
      },
    }
  }, {
    tableName: 'users'
  });
};
