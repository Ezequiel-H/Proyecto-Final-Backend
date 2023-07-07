import { schema as Schema, mongoose } from "../db.js";
import { DIAGNOSTICS_KEYS, GROWTH_STAGES_KEYS } from "../constants/plots.js";

export const schema = new Schema(
  {
    humidity: Number,
    color: String,
    ndvi: Number,
    frost: Number,
    diagnostics: {
      type: String,
      enum: Object.values(DIAGNOSTICS_KEYS),
    },
    growthStage: {
      type: String,
      enum: Object.values(GROWTH_STAGES_KEYS),
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlotHistory", schema);
