import { z } from "zod";

const appointmentDate = z.coerce.date().refine((date) => !Number.isNaN(date.getTime()), {
  message: "appointmentDate must be a valid date",
});

export const createAppointmentSchema = z.object({
  patientId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  appointmentDate,
});

export const updateAppointmentSchema = z.object({
  appointmentDate: appointmentDate.optional(),
  status: z.enum(["BOOKED", "CANCELLED"]).optional(),
}).refine((data) => data.appointmentDate !== undefined || data.status !== undefined, {
  message: "At least one field is required",
});
