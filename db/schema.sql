DROP DATABASE IS EXISTS jobsearch_db;
CREATE DATABASE jobsearch_db;

USE jobsearch_db;

CREATE TABLE `activity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `activity` varchar(255) DEFAULT NULL,
  `activityDate` date DEFAULT NULL,
  `jobID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `jobs` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userID` int(10) DEFAULT NULL,
  `jobtitle` varchar(4255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `webpage` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `method` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `active` tinyint(5) NOT NULL DEFAULT '1',
  `status` varchar(255) DEFAULT NULL,
  UNIQUE KEY `unique_id` (`id`),
  KEY `index_userID` (`source`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;