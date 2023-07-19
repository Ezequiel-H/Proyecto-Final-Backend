export const verifyUserField = (user, fieldId) => {
  if (!user.fields.contains(fieldId)) {
    return catchRequest({
      err: entityNotFound(fieldId, "Field", "1500"),
      res,
    });
  }
};
