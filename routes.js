import { createField } from "./controllers/field.js";
import { getOneSatelite } from "./controllers/satelite.js";
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

  // SATELITE
  // app.get("/satelite/all", getAllSatelites);
  app.get("/satelite:id", [authenticate], getOneSatelite);
};
