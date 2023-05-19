import express from "express";

import bodyParser from "body-parser";

import initRoutes from "./routes.js";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));

initRoutes(app);

export default app;
