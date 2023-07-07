import { schema as Schema, mongoose } from "../db.js";
import { schema as plotHistorySchema } from "./plotHistory.js";

import { CROP_TYPES_KEYS } from "../constants/plots.js";

export const schema = new Schema(
  {
    history: [plotHistorySchema],
    crop: {
      type: String,
      enum: Object.values(CROP_TYPES_KEYS),
    },
  },
  { timestamps: false }
);

export default mongoose.model("Plot", schema);
