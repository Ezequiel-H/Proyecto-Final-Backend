import express from "express";
import bodyParser from "body-parser";
import initRoutes from "./routes.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

initRoutes(app);

export default app;
