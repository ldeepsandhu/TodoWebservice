'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
  }); 
  
  Todos.associate = (models) => {
    // associations can be defined here
	Todos.hasMany(models.TodosItem, {
		foreignKey: 'todoId',
		as: 'todoItems',
	});
  };
  return Todos;
};