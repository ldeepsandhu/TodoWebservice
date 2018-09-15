const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://nkzabock:9iNkzXiiJQvbipbZ7XCDiNlbeNe2ATUo@pellefant.db.elephantsql.com:5432/nkzabock';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query('create table todo(id serial primary key, title varchar(50) not null)');
const query2 = client.query('create table todoitem(id serial primary key, content varchar(1000) not null, complete boolean not null,todoid integer, foreign key(todoid) references todo(id))');
query2.on('end', () => { client.end(); });
