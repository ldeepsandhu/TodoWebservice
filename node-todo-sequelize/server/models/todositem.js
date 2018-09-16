'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodosItem = sequelize.define('TodosItem', {
    content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    complete: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
  });
  
  TodosItem.associate = (models) => {
    // associations can be defined here
	TodosItem.belongsTo(models.Todos, {
		foreignKey: 'todoId',
		onDelete: 'CASCADE',
  });
  };
  return TodosItem;
};