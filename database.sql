CREATE TABLE tasks(
id serial PRIMARY KEY,
task VARCHAR(100) NOT NULL,
dateAdded DATE NOT NULL,
deadline DATE NOT NULL,
priority VARCHAR(10),
status VARCHAR(10)
);
