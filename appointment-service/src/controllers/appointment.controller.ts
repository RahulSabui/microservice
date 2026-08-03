import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

const service = new AppointmentService();

export class AppointmentController {
  async create(req: Request, res: Response) {
    try {
      const appointment = await service.create(req.body);
      return res.status(201).json(appointment);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async getAll(req: Request, res: Response) {
    const patientId = req.query.patientId ? Number(req.query.patientId) : undefined;
    return res.json(await service.getAll(patientId));
  }

  async getById(req: Request, res: Response) {
    const appointment = await service.getById(Number(req.params.id));
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
    return res.json(appointment);
  }

  async update(req: Request, res: Response) {
    try {
      return res.json(await service.update(Number(req.params.id), req.body));
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      return res.json(await service.cancel(Number(req.params.id)));
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to process appointment";
    const status = message === "Appointment not found" || message === "Patient or doctor not found" ? 404 : 400;
    return res.status(status).json({ success: false, message });
  }
}
