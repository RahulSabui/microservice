import axios from "axios";

export default axios.create({
  baseURL: process.env.DOCTOR_SERVICE_URL || "http://localhost:3002",
  timeout: 5000,
});
