import cors from "cors";
import express from "express";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/appointments", appointmentRoutes);

app.get("/", (_, res) => res.json({ success: true, message: "Appointment Service Running" }));

export default app;
