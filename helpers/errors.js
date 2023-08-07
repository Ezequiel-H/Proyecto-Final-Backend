export const verifyUserField = (fields, fieldId) => {
  if (!fields.includes(fieldId)) {
    return catchRequest({
      err: entityNotFound(fieldId, "Field", "1500"),
      res,
    });
  }
};
