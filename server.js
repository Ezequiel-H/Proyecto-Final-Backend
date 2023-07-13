import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

try {
  app.listen(8081);
  console.log("Listening on port 8081");
} catch (error) {
  console.log(error);
}
