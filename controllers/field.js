import { DIAGNOSTICS_KEYS, GROWTH_STAGES_KEYS } from "../constants/plots.js";
import { entityNotFound, invalidFormatError } from "../errors.js";
import { changeFieldAndSave } from "../helpers/entities.js";
import { catchRequest, endRequest } from "../helpers/request.js";
import { getFieldById } from "../interactors/field.js";
import { addDefaultHistoryToPlots } from "../mapper/field.js";
import Field from "../models/field.js";
import { verifyUserField } from "../helpers/errors.js";

export const createField = async (req, res) => {
  try {
    const { plots, coordinates, ...restOfBody } = req.body;
    const { image } = req.files;
    if (!image)
      return catchRequest({
        err,
        res,
        internalCode: "1007",
      });
    const imagePath = process.cwd() + "/media/" + image.name;
    image.mv(imagePath);
    const newField = await Field.create({
      ...restOfBody,
      coordinates: JSON.parse(coordinates),
      plots: addDefaultHistoryToPlots(JSON.parse(plots)),
      image: image.name,
    });
    req.user.fields = [...req.user.fields, newField._id];
    await req.user.save();
    endRequest({
      response: { field: newField },
      code: 201,
      res,
    });
  } catch (err) {
    catchRequest({
      err,
      res,
      message: "Error while creating field",
      internalCode: "1001",
    });
  }
};

export const getField = async (req, res) => {
  const fieldId = req?.params?.id.toString();
  try {
    const userFields = req.user.fields.map((fieldId) => fieldId.toString());
    verifyUserField(userFields, fieldId);
    const field = await getFieldById(fieldId);
    endRequest({
      response: field,
      code: 201,
      res,
    });
  } catch (err) {
    catchRequest({
      err: entityNotFound(fieldId, "Field", "1500"),
      res,
    });
  }
};

export const updateCrops = async (req, res) => {
  try {
    const { plots } = req.body;
    const fieldId = req.params.id;
    verifyUserField(req.user, fieldId);
    const field = await getFieldById(fieldId);
    if (field.plots.length() !== plots.length()) {
      return catchRequest({
        err: invalidFormatError("Different field size"),
        res,
      });
    }
    const newPlots = field.plots.map((plot, index) => {
      const newCrop = plots[index].crop;
      const lastHistoryItem = plot.history.slice(-1);
      if (newCrop !== lastHistoryItem.crop) {
        lastHistoryItem.crop = newCrop;
        lastHistoryItem.diagnostics = DIAGNOSTICS_KEYS.NONE;
        lastHistoryItem.growthStage = GROWTH_STAGES_KEYS.GERMINATION;
        plot.history.push(lastHistoryItem);
      }
      return plot;
    });
    await changeFieldAndSave(field, "plots", newPlots);
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
      message: "Error while updating plots",
      internalCode: "1006",
    });
  }
};

export const addHistory = async (req, res) => {
  try {
    const history = req.body;
    const fieldId = req.params.id;
    verifyUserField(req.user.fields, fieldId);
    var field = await getFieldById(fieldId);
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
