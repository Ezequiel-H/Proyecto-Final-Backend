import Field from "../models/field.js";

export const getFieldByCriteria = (criteria) => Field.findOne(criteria);

export const getFieldById = (_id) => getFieldByCriteria({ _id });
