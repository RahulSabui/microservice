import express from "express";
import cors from "cors";
import proxyRoutes from "./routes/proxy.routes";

const app = express();

app.use(cors());
// app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use(proxyRoutes);

export default app;