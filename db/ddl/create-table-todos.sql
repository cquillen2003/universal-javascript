DROP TABLE todos

CREATE TABLE todos(
	_id serial PRIMARY KEY,
	name VARCHAR (50),
	description VARCHAR (250)
);