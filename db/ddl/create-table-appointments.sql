CREATE TABLE appointments(
	_id serial PRIMARY KEY,
	company_id INT,
	job_id INT, 
	start_time VARCHAR (25),
	duration INT
);