import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { validate } from "../middleware/validate.middleware";
import { createAppointmentSchema, updateAppointmentSchema } from "../validators/appointment.validator";

const router = Router();
const controller = new AppointmentController();

router.post("/", validate(createAppointmentSchema), controller.create.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.put("/:id", validate(updateAppointmentSchema), controller.update.bind(controller));
router.delete("/:id", controller.cancel.bind(controller));

export default router;
