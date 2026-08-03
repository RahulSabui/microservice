ALTER TABLE `doctors` ADD `license_number` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` ADD `updated_at` timestamp DEFAULT (now());