import { z } from "zod";

export const createDoctorSchema = z.object({
    userId: z.number(),
    specialization: z.string().min(3),
    experience: z.number().min(0),
    licenseNumber: z.string().min(5)
});