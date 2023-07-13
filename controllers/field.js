import { catchRequest, endRequest } from "../helpers/request.js";
import Field from "../models/field.js";

export const createField = async (req, res) => {
  try {
    const newField = await Field.create(req.body);
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
