import express from "express";
import bodyParser from "body-parser";
import initRoutes from "./routes.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());

initRoutes(app);

export default app;
