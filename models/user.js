import { schema as Schema, mongoose } from "../db.js";

const schema = new Schema(
  {
    name: String,
    birthDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", schema);
