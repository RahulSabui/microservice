import { Request, Response } from "express";
import { DoctorService } from "../services/doctor.service";

const service = new DoctorService();

export class DoctorController {
    async create(req:Request,res:Response){
        const doctor = await service.create(req.body);
        res.status(201).json(doctor);
    }

    async getAll(req:Request,res:Response){
        const doctors = await service.getAll();
        res.json(doctors);
    }

    async getById(req:Request,res:Response){
        const doctor = await service.getById(Number(req.params.id));
        res.json(doctor);

    }

    async getAvailability(req: Request, res: Response) {
        const doctor = await service.getById(Number(req.params.id));
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        return res.json({ id: doctor.id, available: doctor.isAvailable });
    }

    async delete(req:Request,res:Response){
        await service.delete(Number(req.params.id));
        res.json({
            success:true
        });

    }

}
