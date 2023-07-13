export const unauthorizedUser = (message, internalCode) => ({
  code: 401,
  message,
  internalCode,
});

export const entityNotFound = (id, entity, internalCode) => ({
  code: 404,
  message: `The ${entity} with ${id} was not found`,
  internalCode,
});

export const invalidFormatError = (message) => ({
  code: 400,
  message,
  internalCode: "1000",
});

export const entityAlreadyExists = (id, entity, internalCode) => ({
  code: 400,
  message: `The ${entity} with ${id} already exists`,
  internalCode,
});
