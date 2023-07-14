import { DIAGNOSTICS_KEYS } from "../constants/plots.js";

export const generateDiagnostics = (plots, plotsWithData) =>
  plots.map(({ crop, history }, index) => {
    const newHistory = history.slice(-1);
    const { humidity, frost, color, ndvi } = plotsWithData[index];
    newHistory = { ...newHistory, humidity, frost, color, ndvi };
    const plotDiagnostic = getPlotDiagnostic(newHistory);
    newHistory.diagnostics = plotDiagnostic;
    history.push(newHistory);
    return { crop, history };
  });

const getPlotDiagnostic = ({ ndvi, frost, humidity }) =>
  frost > 0.5
    ? DIAGNOSTICS_KEYS.FROSTING
    : humidity < 0.6
    ? DIAGNOSTICS_KEYS.DEHYDRATION
    : ndvi < 0.5
    ? DIAGNOSTICS_KEYS.OVERHYDRATION
    : ndvi < 0.6
    ? DIAGNOSTICS_KEYS.GOOD
    : ndvi < 0.8
    ? DIAGNOSTICS_KEYS.VERY_GOOD
    : DIAGNOSTICS_KEYS.EXCELENT;
