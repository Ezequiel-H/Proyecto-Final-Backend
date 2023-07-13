export const bodyToUserMapper = ({ name, birthDate, email, password }) => ({
  name,
  birthDate: new Date(birthDate),
  email,
  password,
});
