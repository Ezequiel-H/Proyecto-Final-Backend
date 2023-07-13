export const changeField = (object, fieldName, newValue) => {
  object[fieldName] = newValue;
};

export const changeFieldAndSave = (object, fieldName, newValue) => {
  changeField(object, fieldName, newValue);
  return object.save();
};
