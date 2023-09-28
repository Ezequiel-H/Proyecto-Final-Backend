import { DIAGNOSTICS_KEYS, GROWTH_STAGES_KEYS } from "../constants/plots.js";
import { changeFieldAndSave } from "../helpers/entities.js";
import { catchRequest, endRequest } from "../helpers/request.js";
import { getFieldById } from "../interactors/field.js";

const findNeighbours = (index, array2d, el) => {
  const rowIndex = parseInt(index / width);
  const columnIndex = array2d[rowIndex].findIndex((c) => c === index);
  const right = array2d[rowIndex][columnIndex + 1];
  const left = array2d[rowIndex][columnIndex - 1];
  const bottom = array2d[rowIndex - 1]?.[columnIndex];
  const top = array2d[rowIndex + 1]?.[columnIndex];
  const neighbours = [right, left, bottom, top]
    .filter((n) => n !== undefined)
    .forEach((n) => highlight(n));
};

export const addDiagnosic = async (req, res) => {
  try {
    const { diagnostic, lat, lon } = req.body;
    const fieldId = req.params.id;
    var field = await getFieldById(fieldId);

    const plotWithDiagnostic = 666;
    const finalAnswer = [];
    const itemsToInvestigate = [];

    finalAnswer.push(plotWithDiagnostic);
    itemsToInvestigate.push(plotWithDiagnostic);

    await changeFieldAndSave(field, "history", history);
    field = await getFieldById(fieldId);
    endRequest({
      response: { field },
      code: 201,
      res,
    });
  } catch (err) {
    catchRequest({
      err,
      res,
      message: "Error while updating history",
      internalCode: "1007",
    });
  }
};
