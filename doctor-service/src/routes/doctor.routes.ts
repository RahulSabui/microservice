import { Router } from "express";
import { DoctorController } from "../controllers/doctor.controller";

const router = Router();

const controller = new DoctorController();

router.post("/",controller.create.bind(controller));

router.get("/",controller.getAll.bind(controller));

router.get("/:id",controller.getById.bind(controller));

router.delete("/:id",controller.delete.bind(controller));

export default router;