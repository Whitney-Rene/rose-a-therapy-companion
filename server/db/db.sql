--start the PostgreSQL command-line utility called "psql" and connect to a PostgreSQL database named "postgres."
psql postgres

--Create 'rose_aTC' dababase
CREATE DATABASE rose_atc;

--Connect to 'blogs' database
\c rose_atc;

--Create users table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, 
  user_name VARCHAR(50) NOT NULL, 
  user_email TEXT NOT NULL, 
  user_password TEXT NOT NULL
);

--Insert new entity/row users table
  --no double quotes

INSERT INTO users (
  user_name, 
  user_email, 
  user_password
) 
  VALUES (
  'Whitney-Rene', 
  'roseWR@gmail.com', 
  '9euh0p82f' 
);

--I could put the hashed pw here after I insert in the db via the server endpoint

--Create entries table
CREATE TABLE entries (
  entry_id SERIAL PRIMARY KEY, 
  entry_type VARCHAR(50) NOT NULL, 
  entry_date DATE DEFAULT CURRENT_DATE NOT NULL, 
  entry_content VARCHAR NOT NULL,
  user_id INT REFERENCES users(user_id)
);

--Insert new entity/row entries table
  --no double quotes

--YYYY-MM-DD

INSERT INTO entries (
    entry_type, 
    entry_date, 
    entry_content,
    user_id
  )
  VALUES (
  'rose', 
  '2023-10-25',
  'I was feeling anxious. I opened the calm app, and use the 3 min breath timer. I took a deep breaths', 
  1
);

--update value of a column

UPDATE entries
SET user_id = 1
WHERE entry_id = 3;
