export interface CreateAppointmentDto {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
}

export interface UpdateAppointmentDto {
  appointmentDate?: Date;
  status?: "BOOKED" | "CANCELLED";
}
