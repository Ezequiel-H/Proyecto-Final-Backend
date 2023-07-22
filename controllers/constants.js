import {
  CROP_TYPES_KEYS,
  DIAGNOSTICS_KEYS,
  GROWTH_STAGES_KEYS,
  PLOT_SIZE,
} from "../constants/plots.js";

export const getAllConstants = (req, res) => {
  res.send({
    PLOT_SIZE,
    DIAGNOSTICS_KEYS,
    GROWTH_STAGES_KEYS,
    CROP_TYPES_KEYS,
  });
};
