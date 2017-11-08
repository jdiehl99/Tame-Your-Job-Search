DROP DATABASE IS EXISTS jobsearch_db;
CREATE DATABASE jobsearch_db;

USE jobsearch_db;

CREATE TABLE `jobs` ( 
	`id` Int( 10 ) AUTO_INCREMENT NOT NULL,
	`userID` Int( 10 ) NULL,
	`jobtitle` VarChar( 4255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`location` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`company` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`contact` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`email` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`phone` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`webpage` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`source` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`method` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`createdAt` DateTime NULL,
	`active` TinyInt( 5 ) NOT NULL DEFAULT '1',
	`status` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB;

CREATE TABLE `activity` ( 
	`id` Int( 10 ) UNSIGNED AUTO_INCREMENT NOT NULL,
	`activity` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`activityDate` Date NULL,
	`jobID` Int( 11 ) NULL,
	`userID` Int( 11 ) NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB;

CREATE TABLE `users` ( 
	`id` Int( 10 ) UNSIGNED AUTO_INCREMENT NOT NULL,
	`username` VarChar( 20 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`password` Char( 60 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `id_UNIQUE` UNIQUE( `id` ),
	CONSTRAINT `username_UNIQUE` UNIQUE( `username` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB;