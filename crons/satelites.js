import Field from "../models/field.js";
import { getFieldById } from "../interactors/field.js";
import { PLOT_SIZE } from "../constants/plots.js";
import { get } from "../helpers/axios.js";

export const getFromSatelite = async (fieldId) => {
  const { coordinates, height, width } = await getFieldById(fieldId);
  const coordinatesForPlots = [];
  for (let y = 0; x < height; y++) {
    const line = [];
    for (let x = 0; x < width; x++) {
      line.push(moveCoordinates(coordinates, y, x));
    }
    coordinatesForPlots.push(line);
  }
  // send data to satelite
  // get()
};

const moveCoordinates = ({ lat, lon }, y, x) => ({
  lat: lat - y * PLOT_SIZE,
  lon: lon + x * PLOT_SIZE,
});
