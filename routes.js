import { createField } from "./controllers/field.js";
import { createUser, deleteUser, signIn } from "./controllers/user.js";
import { authenticate } from "./middlewares/auth.js";

export default (app) => {
  app.get("/health", (_, res) => {
    res.status(200).send("Healthy!");
  });
  // USER
  app.post("/user", createUser);
  app.delete("/user/:id", deleteUser);
  app.get("/sign_in", signIn);

  // FIELD
  app.post("/field", [authenticate], createField);
};
