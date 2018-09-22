const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todositem;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  })); 

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list)
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.post('/api/todos/:todoId', todosController.update);
  app.get('/api/todos/:todoId/delete', todosController.destroy);
  app.get('/api/todos/:todoItemId/deleteitem', todoItemsController.destroy); 
  app.post('/api/todos/:todoItemId/updateitem', todoItemsController.update); 
};