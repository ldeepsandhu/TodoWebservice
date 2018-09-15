router.post('/api/todos', (req, res, next) => {
	var count = 0;
	const results = [];
	const data = { title : req.body.title };
	pg.connect(connectionString, (err, client, done) {
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success : false, data : err});
		}
		
		client.query('select * from todo where title = $1', [data.title]);
		query.on('row', () =>
		{
			count = count + 1;
		});
		
		if(count > 0)
		{
			done();
			console.log('Todo item already exit with same name');
			return res.status(400).json({success : false, data : 'Todo item already exit with same name'});
		}
		
        client.query('INSERT INTO todo(title) values($1)', [data.title]);
        const query = client.query('SELECT * FROM todo where title = $1', data.title);
		
		query.on('row', (row) =>
		{
			results.push(row);
		});
		
		query.on('end', () =>
		{
			res.status(200).json(results);
		});
	});
	});
		
		
		