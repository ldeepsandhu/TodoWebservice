const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://nkzabock:9iNkzXiiJQvbipbZ7XCDiNlbeNe2ATUo@pellefant.db.elephantsql.com:5432/nkzabock';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/todos', (req, res, next) => {
	
	const results = [];
	const data = { title : req.body.title };
	pg.connect(connectionString, (err, client, done) => {
	var count = 0;
	if(err)
	{
		done();
		console.log(err);
		return res.status(500).json({success : false, data : err});
	}
		
	const query = client.query('select * from todo where title = $1', [data.title]);
		
/*	query.on('row', (row) =>
	{
		count = count + 1;
	});
		
	query.on('end', () =>
	{
		if(count > 0)
		{
			done();
			console.log('Todo item already exit with same name');
			return res.status(200).json({success : false, data : 'Todo item already exit with same name'});
		}
	});
	
*/				
	client.query('INSERT INTO todo(title) values($1)', [data.title]);
    const query1 = client.query('SELECT * FROM todo where title = $1', [data.title]);
		
	query1.on('row', (row) =>
	{
		results.push(row);
	});
		
	query1.on('end', () =>
	{
		return res.status(200).json(results);
	});
});
});

router.get('/api/todos', (req, res, next) => {
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
	var count = 0;
	if(err)
	{
		done();
		console.log(err);
		return res.status(500).json({success : false, data : err});
	}
	const query = client.query('select * from todo');
	query.on('row', (row) =>
	{
		var localResult = {};
		localResult.id = row.id;
		localResult.title = row.title;
		results.push(localResult);
	});
	
	query.on('end', () =>
	{
		/*var count = results.length;
		for(var i = 0; i < results.length; i++)
		{
			var id = results[i].id;
			const query1 = client.query('select * from todoitem where todoid = $1', [id]);
			query1.on('row', (row) =>
			{
				results[i][todoItemsList].push(row);
			});
			query1.on('end', () =>
			{
			count--;
			if(count == 0)
			{
				return res.status(200).json(result);
			}
			});
		} */
		return res.status(200).json(results);
	});
});
});

router.post('/api/todos/:todo_id/items', (req, res, next) =>
{
	const results = [];
	const data = {content : req.body.content, complete : req.body.complete};
	const todo_id = req.params.todo_id;
	pg.connect(connectionString, (err, client, done) =>
	{
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success : false, data:err});
		}
		client.query('INSERT INTO todoitem(content, complete, todoid) values($1, $2, $3)', [data.content, data.complete, todo_id]);
		const query1 = client.query('SELECT * FROM todoitem where content = $1', [data.content]);
		query1.on('row', (row) =>
	    {
			results.push(row);
	    });
		
		query1.on('end', () =>
		{
			return res.status(200).json(results);
		});
	});
});
		
router.get('/api/todos/:todo_id', (req, res, next) => {
	const result = {};
	const todoItems = [];
	const todo_id = req.params.todo_id;
	pg.connect(connectionString, (err, client, done) => {
	var count = 0;
	if(err)
	{
		done();
		console.log(err);
		return res.status(500).json({success : false, data : err});
	}
	const query = client.query('select * from todo where id = $1', [todo_id]);
	query.on('row', (row) =>
	{
		result.id = row.id;
		result.title = row.title;
	});
	
	query.on('end', () =>
	{
		const query1 = client.query('select * from todoitem where todoid = $1', [todo_id]);
		query1.on('row', (row) =>
		{
			todoItems.push(row);
		});
		query1.on('end', () =>
		{
			result.todoItems = todoItems;
			return res.status(200).json(result);
		});
	});
			
});
});

router.post('/api/todos/:todo_id', (req, res, next) =>
{
	const result = {};
	const todoItems = [];
	const data = {title : req.body.title};
	const todo_id = req.params.todo_id;
	pg.connect(connectionString, (err, client, done) =>
	{
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success : false, data:err});
		}
		client.query('update  todo set title = $1 where id = $2', [data.title, todo_id]);
		const query = client.query('select * from todo where id = $1', [todo_id]);
	    query.on('row', (row) =>
		{
			result.id = row.id;
			result.title = row.title;
		});
	
		query.on('end', () =>
		{
		const query1 = client.query('select * from todoitem where todoid = $1', [todo_id]);
		query1.on('row', (row) =>
		{
			todoItems.push(row);
		});
		query1.on('end', () =>
		{
			result.todoItems = todoItems;
			return res.status(200).json(result);
		});
	});
	});
});
		
router.get('/api/todos/:todo_id/delete', (req, res, next) =>
{
	const todo_id = req.params.todo_id;
	pg.connect(connectionString, (err, client, done) =>
	{
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success : false, data : err});
		}
		const query = client.query('delete from todoitem where todoid = $1', [todo_id]);
	    query.on('end', () =>
		{
		const query1 = client.query('delete from todo where id = $1', [todo_id]);
		query1.on('end', () =>
		{
			return res.status(200).json({success : true, data : 'Successfully deleted'});
		});
	});
	});
});

router.post('/api/todos/:todolist_id/updateitem', (req, res, next) =>
{
	const results = [];
	const data = {content : req.body.content, complete : req.body.complete};
	const todoitem_id = req.params.todolist_id;
	pg.connect(connectionString, (err, client, done) =>
	{
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success : false, data:err});
		}
		client.query('update todoitem set complete = $1 where id = $2', [data.complete, todoitem_id]);
		const query1 = client.query('SELECT * FROM todoitem where id = $1', [todoitem_id]);
		query1.on('row', (row) =>
	    {
			results.push(row);
	    });
		
		query1.on('end', () =>
		{
			return res.status(200).json(results);
		});
	});
});

router.get('/api/todos/:todo_id/deleteitem', (req, res, next) =>
{
	const todo_id = req.params.todo_id;
	pg.connect(connectionString, (err, client, done) =>
	{
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success : false, data : err});
		}
		const query = client.query('delete from todoitem where todoid = $1', [todo_id]);
	    query.on('end', () =>
		{
			return res.status(200).json({success : true, data : 'Successfully deleted'});
		});
	});
	});
	
module.exports = router;
