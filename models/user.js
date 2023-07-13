import { schema as Schema, mongoose } from "../db.js";

const schema = new Schema(
  {
    name: String,
    birthDate: Date,
    fields: [{ type: mongoose.Schema.Types.ObjectId, ref: "Field" }],
    email: String,
    password: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", schema);
