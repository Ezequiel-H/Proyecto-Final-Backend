import { schema as Schema, mongoose } from "../db.js";

import { schema as plotSchema } from "./plot.js";

const schema = new Schema(
  {
    name: String,
    coordinates: { lat: Number, lon: Number },
    plots: [plotSchema],
    height: Number,
    width: Number,
    image: String,
    history: {
      years: [Number],
      sown: [Number],
      harvested: [Number],
      production: [Number],
      performance: [Number],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Field", schema);
