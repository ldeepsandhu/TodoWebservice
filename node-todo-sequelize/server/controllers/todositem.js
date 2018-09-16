const TodoItem = require('../models').TodosItem;
const Todo = require('../models').Todos;

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(200).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
 
destroy(req, res) {
  return TodoItem
    .find({
        where: {
          id: req.params.todoItemId,
        },
      })
    .then(todoItem => {
      if (!todoItem) {
        return res.status(400).send({
          message: 'TodoItem Not Found',
        });
      }

      return todoItem
        .destroy()
        .then(() => res.status(200).send({ message: 'Todo deleted successfully.'}))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error)); 
},

 update(req, res) {
  return TodoItem
    .find({
        where: {
          id: req.params.todoItemId,
        },
      })
    .then(todoItem => {
      if (!todoItem) {
        return res.status(400).send({
          message: 'TodoItem Not Found',
        });
      }

      return todoItem
        .update({
          content: req.body.content || todoItem.content,
          complete: req.body.complete || todoItem.complete,
        })
        .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}, 

};
