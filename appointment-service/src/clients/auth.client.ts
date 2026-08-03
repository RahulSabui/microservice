import axios from "axios";

export default axios.create({
  baseURL: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
  timeout: 5000,
});
