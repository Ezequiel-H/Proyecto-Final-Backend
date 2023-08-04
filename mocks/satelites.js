export const mockAddSateliteData = (plots) =>
  plots.map((plot) => ({
    humidity: Math.random(),
    color: Math.floor(Math.random() * 16777215).toString(16),
    frost: Math.random(),
    ndvi: Math.random() > 0.5 ? Math.random() : -1 * Math.random(),
  }));
