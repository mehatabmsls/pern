CREATE DATABASE todo;

CREATE TABLE IF NOT EXISTS todolist (id SERIAL PRIMARY KEY, todo_item VARCHAR(255) NOT NULL);

-- GET
-- SELECT * FROM todolist;
-- POST
-- INSERT INTO todolist (todo_item) VALUES ('checking');
-- DELETE
-- DELETE FROM todolist WHERE id='1';
-- PUT
-- UPDATE todolist SET todo_item = 'check' WHERE id='1';