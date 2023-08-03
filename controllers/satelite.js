import { getFromSatelite } from "../crons/satelite.js";
import { entityNotFound } from "../errors.js";
import { catchRequest, endRequest } from "../helpers/request.js";
import { getFieldById } from "../interactors/field.js";
import Field from "../models/field.js";

export const getOneSatelite = async (req, res) => {
  try {
    const fieldId = req.params.id;
    if (!req.user.fields.includes(fieldId)) {
      return catchRequest({
        err: entityNotFound(fieldId, "Field", "1500"),
        res,
      });
    }
    const field = await getFieldById(fieldId);
    const updatedField = await getFromSatelite(field);

    endRequest({
      code: 200,
      response: updatedField,
      res,
    });
  } catch (err) {
    catchRequest({
      err,
      res,
      message: "Error while getting data from satelite",
      internalCode: "1501",
    });
  }
};

export const getAllSatelites = async (req, res) => {
  try {
    const fields = await Field.find({});
    Promise.all(fields.map((field) => getFromSatelite(field))).then(
      (values) => {
        endRequest({
          code: 200,
          response: values,
          res,
        });
      }
    );
  } catch (err) {
    catchRequest({
      err,
      res,
      message: "Error while getting data from multiple satelites",
      internalCode: "1502",
    });
  }
};
