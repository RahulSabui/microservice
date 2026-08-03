import "dotenv/config";
import app from "./app";

const port = Number(process.env.PORT) || 3003;
app.listen(port, () => console.log(`Appointment service running on port ${port}`));
