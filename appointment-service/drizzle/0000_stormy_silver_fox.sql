CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` int NOT NULL,
	`doctor_id` int NOT NULL,
	`appointment_date` timestamp NOT NULL,
	`status` enum('BOOKED','CANCELLED') NOT NULL DEFAULT 'BOOKED',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
