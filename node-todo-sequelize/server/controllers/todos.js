const Todo = require('../models').Todos;

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
		.all()
		.then(todo => res.status(200).send(todo))
		.catch(error => res.status(400).send(error))
	},
};