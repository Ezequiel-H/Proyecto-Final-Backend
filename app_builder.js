import express from "express";

import bodyParser from "body-parser";

import initRoutes from "./routes.js";

const app = express();

app.use(bodyParser.json());

initRoutes(app);

export default app;
