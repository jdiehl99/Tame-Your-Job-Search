DROP DATABASE IS EXISTS jobsearch_db;
CREATE DATABASE jobsearch_db;

USE jobsearch_db;

CREATE TABLE jobs (
    id INT(11) AUTO_INCREMENT NOT NULL,
    jobtitle VARCHAR(255),
    company VARCHAR(255),
    contact VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    webpage VARCHAR(255),
    source VARCHAR(255),
    method VARCHAR(255),
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);