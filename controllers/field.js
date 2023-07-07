import Field from "../models/field.js";
import User from "../models/user.js";

export const createField = async (req, res) => {
  try {
    const fieldOwner = await User.find({ _id: req.user.id });
    if (!!fieldOwner) {
      const newField = await Field.create(req.body);
      fieldOwner.fields = [...fieldOwner.fields, newField._id];
      await fieldOwner.save();
      res.json({ field: newField });
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    response.status(400).json(e);
  }
};
