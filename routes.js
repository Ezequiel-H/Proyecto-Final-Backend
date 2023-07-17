import { createField } from "./controllers/field.js";
import { getAllSatelites, getOneSatelite } from "./controllers/satelite.js";
import {
  changePassword,
  createUser,
  deleteUser,
  restorePassword,
  signIn,
} from "./controllers/user.js";
import { authenticate } from "./middlewares/auth.js";

export default (app) => {
  app.get("/health", (_, res) => {
    res.status(200).send("Healthy!");
  });
  // USER
  app.post("/user", createUser);
  app.delete("/user/:id", deleteUser);
  app.get("/sign_in", signIn);
  app.post("/restore_password", restorePassword);
  app.delete("change_password/:id", changePassword);

  // FIELD
  app.post("/field", [authenticate], createField);

  // SATELITE
  app.get("/satelite/all", getAllSatelites);
  app.get("/satelite/:id", [authenticate], getOneSatelite);
};
