const Todo = require('../models').Todos;
const TodosItem = require('../models').TodosItem;

module.exports = {
	create(req, res) {
		return Todo
		.create({
			title: req.body.title,
		})
		.then(todo => res.status(200).send(todo))
		.catch(error => res.status(400).send(error))
	},
	list(req, res){
		return Todo
		.findAll({
			include: [{
				model: TodosItem,
				as: 'todoitems',
			}],
		})
		.then(todo => res.status(200).send(todo))
		.catch(error => res.status(400).send(error))
	},
	retrieve(req, res) {
    return Todo
    .findById(req.params.todoId, {
      include: [{
        model: TodosItem,
        as: 'todoItems',
      }],
    })
    .then(todo => {
      if (!todo) {
        return res.status(200).send({
          message: 'Todo Not Found',
        });
      }
      return res.status(200).send(todo);
    })
    .catch(error => res.status(400).send(error));
   },
   update(req, res) {
     return Todo
    .findById(req.params.todoId, {
      include: [{
        model: TodosItem,
        as: 'todoItems',
      }],
    })
    .then(todo => {
      if (!todo) {
        return res.status(200).send({
          message: 'Todo Not Found',
        });
      }
      return todo
        .update({
          title: req.body.title || todo.title,
        })
        .then(() => res.status(200).send(todo))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
    destroy(req, res) {
    return Todo
    .findById(req.params.todoId)
    .then(todo => {
      if (!todo) {
        return res.status(200).send({
          message: 'Todo Not Found',
        });
      }
      return todo
        .destroy()
        .then(() => res.status(200).send({ message: 'Todo deleted successfully.'}))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};