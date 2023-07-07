import { createField } from "./controllers/field.js";
import { createUser, deleteUser, findUsers } from "./controllers/user.js";

export default (app) => {
  app.get("/health", (_, res) => {
    res.send("Healthy!");
  });

  app.post("/user", createUser);
  app.get("/user", findUsers);
  app.delete("/user/:id", deleteUser);

  app.post("/field", createField);
};
