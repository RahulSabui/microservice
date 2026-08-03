import { mysqlTable, int, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";


export const doctors =
    mysqlTable(
        "doctors",
        {
            id: int("id").autoincrement().primaryKey(),
            userId: int("user_id").notNull(),
            specialization: varchar("specialization", { length: 100 }).notNull(),
            experience: int("experience").notNull(),
            licenseNumber: varchar("license_number", {length: 50}).notNull(),
            isAvailable: boolean("is_available").notNull().default(true),
            createdAt: timestamp("created_at").defaultNow(),
            updatedAt: timestamp("updated_at").defaultNow()
        });
