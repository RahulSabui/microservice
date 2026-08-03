import doctorClient from "./doctor.client";

export class DoctorServiceClient {
  async getAvailability(doctorId: number) {
    const response = await doctorClient.get(`/internal/doctors/${doctorId}/availability`);
    return response.data as { id: number; available: boolean };
  }
}
