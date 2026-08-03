import dotenv from "dotenv";

dotenv.config();

export const env = {

    PORT:Number(process.env.PORT),

    AUTH_SERVICE:
        process.env.AUTH_SERVICE!,

    DOCTOR_SERVICE:
        process.env.DOCTOR_SERVICE!,

    APPOINTMENT_SERVICE:
        process.env.APPOINTMENT_SERVICE!

};