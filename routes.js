import { createUser } from "./controllers/user.js";

export default (app) => {
  app.get("/health", (req, res) => {
    res.send("Healthy!");
  });

  app.post("/user", createUser);
};
