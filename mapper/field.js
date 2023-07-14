import { CROP_TYPES_KEYS, GROWTH_STAGES_KEYS } from "../constants/plots.js";

export const addDefaultHistoryToPlots = (plotArray) =>
  plotArray.map((plot) => {
    plot.history = [
      {
        crop: plot.crop,
        growthStage:
          plot.crop === CROP_TYPES_KEYS.NONE
            ? GROWTH_STAGES_KEYS.NONE
            : GROWTH_STAGES_KEYS.GERMINATION,
      },
    ];
    return plot;
  });
