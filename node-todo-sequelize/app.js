const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//create the express appCodeName
const app = express();

app.use(logger('dev')); //logging to the console

//parse the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendes : false}));

require('./server/routes')(app);
//getURL
app.get('*', (req, res) => 
{
	 res.status(200).send({message : 'Welcome to the todo server'});
});

module.exports = app;
	