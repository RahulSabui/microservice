import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctor.routes";
import { DoctorController } from "./controllers/doctor.controller";

const app = express();
const doctorController = new DoctorController();

app.use(cors());

app.use(express.json());

app.use("/",doctorRoutes);
app.get("/internal/doctors/:id/availability", doctorController.getAvailability.bind(doctorController));
// app.get("/", (_, res) => {
//     res.json({
//         success: true,
//         message: "Doctor Service Running 🚀"
//     });
// });

export default app;
