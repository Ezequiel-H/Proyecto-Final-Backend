export const bodyToUserMapper = ({ name, birthDate, email, password }) => ({
  name,
  birthDate: new Date(birthDate),
  email,
  password,
});

export const removePassword = ({ password, ...restObject }) => restObject;
