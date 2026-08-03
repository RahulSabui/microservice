CREATE TABLE `doctors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`specialization` varchar(100) NOT NULL,
	`experience` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `doctors_id` PRIMARY KEY(`id`)
);
