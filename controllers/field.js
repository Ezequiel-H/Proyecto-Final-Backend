import { catchRequest, endRequest } from "../helpers/request.js";
import { addDefaultHistoryToPlots } from "../mapper/field.js";
import Field from "../models/field.js";

export const createField = async (req, res) => {
  try {
    const { plots, ...restOfBody } = req.body;
    const newField = await Field.create({
      ...restOfBody,
      plots: addDefaultHistoryToPlots(plots),
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
