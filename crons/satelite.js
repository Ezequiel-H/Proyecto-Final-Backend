import { PLOT_SIZE } from "../constants/plots.js";
import { post } from "../helpers/axios.js";
import { generateDiagnostics } from "../ia/diagnostic.js";
import { changeFieldAndSave } from "../helpers/entities.js";
import { GET_ONE_SATELITE } from "../constants/satelite_endpoints.js";
import { mockAddSateliteData } from "../mocks/satelites.js";

export const getFromSatelite = async (field) => {
  const mappedPlots = field.plots.map((plot, index) => {
    const row = Math.floor(index / field.width);
    const column = index % field.width;
    const newCoordinates = moveCoordinates(field.coordinates, row, column);
    return { ...newCoordinates, crop: plot.crop };
  });

  // send data to satelite
  // const plotsWithData = await post(GET_ONE_SATELITE, mappedPlots);
  const plotsWithSateliteData = mockAddSateliteData(mappedPlots);
  const plotsWithDiagnostic = generateDiagnostics(
    field.plots,
    plotsWithSateliteData
  );
  return changeFieldAndSave(field, "plots", plotsWithDiagnostic);
};

const matrixViewOfField = () => {
  const coordinatesForPlots = [];
  for (let y = 0; x < height; y++) {
    const line = [];
    for (let x = 0; x < width; x++) {
      line.push(moveCoordinates(coordinates, y, x));
    }
    coordinatesForPlots.push(line);
  }
  return coordinatesForPlots;
};

const moveCoordinates = ({ lat, lon }, y, x) => ({
  lat: lat - y * PLOT_SIZE,
  lon: lon + x * PLOT_SIZE,
});
