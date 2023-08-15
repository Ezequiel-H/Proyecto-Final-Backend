import { getAllConstants } from "./controllers/constants.js";
import {
  addHistory,
  createField,
  getField,
  updateCrops,
} from "./controllers/field.js";
import { getAllSatelites, getOneSatelite } from "./controllers/satelite.js";
import {
  changePassword,
  createUser,
  deleteUser,
  getUserFields,
  restorePassword,
  signIn,
  updateUser,
} from "./controllers/user.js";
import { getFieldById } from "./interactors/field.js";
import { authenticate } from "./middlewares/auth.js";
import Field from "./models/field.js";

export default (app) => {
  app.get("/health", (_, res) => {
    res.status(200).send("Healthy!");
  });
  // USER
  app.post("/user", createUser);
  app.delete("/user/:id", deleteUser);
  app.post("/sign_in", signIn);
  app.post("/restore_password", restorePassword);
  app.post("/change_password/:id", changePassword);
  app.patch("/update_user", [authenticate], updateUser);
  app.get("/user/fields", [authenticate], getUserFields);

  // FIELD
  app.post("/field", [authenticate], createField);
  app.get("/field/:id", [authenticate], getField);
  app.patch("/field/:id", [authenticate], updateCrops);
  app.patch("/field/history/:id", [authenticate], addHistory);

  // SATELITE
  app.get("/satelite/all", getAllSatelites);
  app.get("/satelite/:id", [authenticate], getOneSatelite);
  app.get("/image/:id", async (req, res) => {
    const field = await getFieldById(req.params.id);
    const path = `${process.cwd()}/media/${field.image}`;
    res.sendFile(path);
  });

  // CONSTANTS
  app.get("/constants", getAllConstants);
};
