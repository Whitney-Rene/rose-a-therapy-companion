/* Replace with your SQL commands */
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, 
  user_name VARCHAR(50) NOT NULL, 
  user_email TEXT NOT NULL, 
  user_password TEXT NOT NULL
);

CREATE TABLE entries (
  entry_id SERIAL PRIMARY KEY, 
  entry_type VARCHAR(50) NOT NULL, 
  entry_date DATE DEFAULT CURRENT_DATE NOT NULL, 
  entry_content VARCHAR NOT NULL,
  user_id INT REFERENCES users(user_id)
);

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


SELECT pg_catalog.setval('students_id_seq', 16, true);
