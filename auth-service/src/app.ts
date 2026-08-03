import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { AuthController } from "./controllers/auth.controller";

const app = express();
const authController = new AuthController();

app.use(cors());

app.use(express.json());
app.use("/", authRoutes);

app.get(
    "/internal/users/:id",
    authController.getUserById.bind(authController)
);

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Auth Service Running 🚀"
    });
});

export default app;
