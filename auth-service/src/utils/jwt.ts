import jwt from "jsonwebtoken";
import { env } from "../ config/ env";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
export const verifyAccessToken = (token:string) => {
    return jwt.verify(
        token,
        env.JWT_SECRET
    );
};