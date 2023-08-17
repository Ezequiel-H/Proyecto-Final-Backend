import { initDatabase } from "./db.js";
import app from "./app_builder.js";
import dotenv from "dotenv";

dotenv.config();

initDatabase();

export default app;
