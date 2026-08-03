import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const result = await authService.register(req.body);

            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message:
                    error instanceof Error ? error.message : "Something went wrong",
            });
        }
    }
    async login(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message:
                    error instanceof Error ? error.message : "Authentication failed",
            });
        }
    }

    async getUserById(req: Request, res: Response) {
        const user = await authService.getUserId(
            Number(req.params.id)
        );
        console.log(user, req.params);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.json(user);
    }
}