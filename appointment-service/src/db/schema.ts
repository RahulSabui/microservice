import { int, mysqlEnum, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const appointmentStatus = ["BOOKED", "CANCELLED"] as const;

export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  patientId: int("patient_id").notNull(),
  doctorId: int("doctor_id").notNull(),
  appointmentDate: timestamp("appointment_date", { mode: "date" }).notNull(),
  status: mysqlEnum("status", appointmentStatus).notNull().default("BOOKED"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
