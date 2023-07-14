import { getFromSatelite } from "../crons/satelite.js";
import { entityNotFound } from "../errors.js";
import { catchRequest } from "../helpers/request.js";

export const getOneSatelite = async (req, res) => {
  try {
    const fieldId = req.params.id;
    if (!req.user.fields.contains(fieldId)) {
      return catchRequest({
        err: entityNotFound(fieldId, "Field", "1500"),
        res,
      });
    }
    await getFromSatelite(fieldId);

    endRequest({
      code: 200,
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
