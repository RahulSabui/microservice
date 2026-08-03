import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/*
    AUTH SERVICE
*/

router.use(
    "/api/auth",
    createProxyMiddleware({

        target: env.AUTH_SERVICE,

        changeOrigin: true,

        pathRewrite: {
            "^/api/auth": "/api/auth"
        }

    })
);
/*
    DOCTOR SERVICE
*/

router.use(
    "/api/doctors",
    authMiddleware,
    createProxyMiddleware({

        target: env.DOCTOR_SERVICE,

        changeOrigin: true,
          pathRewrite: {
            "^/api/doctors": "/api/doctors"
        }

    })
);

/*
    APPOINTMENT SERVICE
*/

router.use(
    "/api/appointments",
    createProxyMiddleware({

        target: env.APPOINTMENT_SERVICE,

        changeOrigin: true

    })
);

export default router;