import { and, eq } from "drizzle-orm";
import { db } from "../config/db";
import { appointments } from "../db/schema";
import { CreateAppointmentDto, UpdateAppointmentDto } from "../types/appointment.types";

export class AppointmentRepository {
  async create(data: CreateAppointmentDto) {
    const result = await db.insert(appointments).values(data);
    return this.findById(Number(result[0].insertId));
  }

  async findAll(patientId?: number) {
    return patientId
      ? db.select().from(appointments).where(eq(appointments.patientId, patientId))
      : db.select().from(appointments);
  }

  async findById(id: number) {
    const result = await db.select().from(appointments).where(eq(appointments.id, id));
    return result[0];
  }

  async findBookedConflict(doctorId: number, appointmentDate: Date, excludeId?: number) {
    const result = await db.select().from(appointments).where(
      and(eq(appointments.doctorId, doctorId), eq(appointments.appointmentDate, appointmentDate), eq(appointments.status, "BOOKED")),
    );
    return result.find((appointment) => appointment.id !== excludeId);
  }

  async update(id: number, data: UpdateAppointmentDto) {
    await db.update(appointments).set(data).where(eq(appointments.id, id));
    return this.findById(id);
  }
}
