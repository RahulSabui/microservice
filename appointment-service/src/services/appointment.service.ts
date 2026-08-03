import axios from "axios";
import { AuthServiceClient } from "../clients/auth.service";
import { DoctorServiceClient } from "../clients/doctor.service";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { CreateAppointmentDto, UpdateAppointmentDto } from "../types/appointment.types";

export class AppointmentService {
  private repository = new AppointmentRepository();
  private authClient = new AuthServiceClient();
  private doctorClient = new DoctorServiceClient();

  async create(data: CreateAppointmentDto) {
    if (data.appointmentDate <= new Date()) {
      throw new Error("Appointment date must be in the future");
    }

    await this.ensurePatientAndDoctor(data.patientId, data.doctorId);
    await this.ensureNoConflict(data.doctorId, data.appointmentDate);
    return this.repository.create(data);
  }

  async getAll(patientId?: number) {
    return this.repository.findAll(patientId);
  }

  async getById(id: number) {
    return this.repository.findById(id);
  }

  async update(id: number, data: UpdateAppointmentDto) {
    const appointment = await this.requireAppointment(id);

    if (data.appointmentDate) {
      if (data.appointmentDate <= new Date()) {
        throw new Error("Appointment date must be in the future");
      }
      await this.ensurePatientAndDoctor(appointment.patientId, appointment.doctorId);
      await this.ensureNoConflict(appointment.doctorId, data.appointmentDate, id);
    }

    return this.repository.update(id, data);
  }

  async cancel(id: number) {
    await this.requireAppointment(id);
    return this.repository.update(id, { status: "CANCELLED" });
  }

  private async requireAppointment(id: number) {
    const appointment = await this.repository.findById(id);
    if (!appointment) throw new Error("Appointment not found");
    return appointment;
  }

  private async ensurePatientAndDoctor(patientId: number, doctorId: number) {
    try {
      const [patient, doctor] = await Promise.all([
        this.authClient.getUser(patientId),
        this.doctorClient.getAvailability(doctorId),
      ]);

      if (!patient) throw new Error("Patient not found");
      if (!doctor.available) throw new Error("Doctor is unavailable");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Patient or doctor not found");
      }
      throw error;
    }
  }

  private async ensureNoConflict(doctorId: number, appointmentDate: Date, excludeId?: number) {
    const conflict = await this.repository.findBookedConflict(doctorId, appointmentDate, excludeId);
    if (conflict) throw new Error("Doctor already has an appointment at this time");
  }
}
